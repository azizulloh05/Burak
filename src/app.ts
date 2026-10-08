import express from 'express'
import morgan from 'morgan'
import path from 'path'
import { MORGAN_FORMAT } from "./controllers/libs/config";
import router from './router'
import routerAdmin from "./router-admin"

import ConnectMongoDB from 'connect-mongodb-session'
import session from 'express-session'
import { T } from "./controllers/libs/types/common"

const MongoStore = ConnectMongoDB(session);
const store = new MongoStore({
    uri: String(process.env.MONGO_URL),
collection: "sessions",
});

/** 1–ENTRANCE **/
const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan(MORGAN_FORMAT))

/** 2–SESSIONS **/
app.use(
	session({
		secret: String(process.env.SESSION_SECRET),
		cookie: {
			maxAge: 1000 * 3600 * 6, // 6hr
		},
		store: store,
		resave: true,
		saveUninitialized: true,
	}),
)

app.use(function (req, res, next) {
	console.log('req.session', req.session)
	const sessionInstance = req.session as T
	console.log('sessionInstance', sessionInstance)
	console.log('res.locals.member1', res.locals.member)
	res.locals.member = sessionInstance.member
	console.log('res.locals.member2', res.locals.member)
	next()
})

/** 3–VIEWS **/
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

/** 4–ROUTERS **/
app.use('/admin', routerAdmin) //SSR
app.use('/', router) //SPA

export default app;