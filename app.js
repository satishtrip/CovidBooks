const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')

dotenv.config({path: './config/config.env' })
connectDB()
const app = express()

//body parser
app.use(express.urlencoded({extended:false}))
app.use(express.json())



//Passport Auth Config
require('./config/passport')(passport)



// at the time of loggin , when env set  is to dev
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }

//my static folder
app.use(express.static(path.join(__dirname)))
//handlebars helpers (time issue at UI fix)
const { formatDate, stripTags,
  truncate,editIcon,select, } = require('./helpers/hbs')

//handlebars

app.engine('.hbs', exphbs({helpers: {formatDate, 
   stripTags,editIcon,select,
  truncate,
},defaultLayout:'main',extname: '.hbs'}));
app.set('view engine', '.hbs');

//sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  //store: new MongoStore({ mongooseConnection: mongoose.connection }),
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
  })
  

  //cookie: { secure: true }
})
)

//passport middleware
app.use(passport.initialize())
app.use(passport.session())


//setting global vars
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})



//Routes/Urls
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))
app.use('/helps',require('./routes/helps'))


  
const PORT = process.env.PORT || 3000


app.listen(PORT, console.log(`Server running on ${process.env.NODE_ENV} node on port ${PORT}`))