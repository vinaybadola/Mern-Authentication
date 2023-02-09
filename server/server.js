import  express  from "express";
import cors from 'cors';
import morgan  from "morgan";
import connect from "./database/conn.js"
import router from "./router/route.js";  // We'll use this as middleware





const app = express();
app.use(express.json());
app.use(cors());
app.use( morgan('tiny'));
app.disable('x-powered-by');     // Less Hackers Know about Our Stack 

const port = 8080;


// HTTP get request
app.get('/', (req,res)=>{
    res.status(201).json('Home Get Req')
});

/**API route */
// So whenever we want to access any Api we have to use /api prefix 
app.use('/api', router)



/**Start Server Only when we have valid Connection  */
connect().then(() => {
    try{
        app.listen(port,()=>{
            console.log(`Server Connected to http://localhost:${port}`);
        })

    }catch(error){
               console.log('Cannot Connect to The Server ');
    }
}).catch(error =>{
     console.log("Invalid DataBase Connection..!")    
})
