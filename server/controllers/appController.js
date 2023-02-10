
import UserModel from "../model/User.model.js";
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import ENV from '../config.js'


/** MiddleWare for Verify User */
export async function VerifyUser(req,res,next){
    try{

        // In this function if the request method is get we get data from the user or else if the request is POST or PUT we'll get the data from req.body
        const {username} = req.method == 'GET'? req.query:req.body;

        // Check the User existence
        // If we find the user in the database the next() function will take us to next controller otherwise it will return error
        let exist = await UserModel.findOne({username});
        if(!exist) return res.status(404).send({error:"Can't Find User"});
        next();

    }catch(error){
        return res.status(404).error({error:"Authentication Error..!"})
    }
}

/** POST :http://localhost:8080/api/register
 * 
 * @param: {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
    
 }
 */
export async function register(req,res){
    try{
        const {username, password, profile,email} = req.body;

        // check the existing User
        // we'll first check if the username already used using "findOne" method,
        //if it is then we show warning else we resolve our promise 
        const existUsername = new Promise((resolve,reject) =>{
            UserModel.findOne({username}, function(err,user){
                if(err) reject(new Error(err))
                if(user) reject({err:"please use Unique name"});
                resolve();
            })
        });

         /** check for Existing Mail */
        const existEmail = new Promise((resolve,reject) =>{
            UserModel.findOne({email}, function(err,email){
                if(err) reject(new Error(err))
                if(email) reject({err:"please use Unique Email"});
                resolve();
            })
        });

        Promise.all([existEmail,existUsername])
        .then(()=>{
            if(password){
                bcrypt.hash(password,10)
                .then(hashedPassword =>{

                    // To store data into the Model
                    const user = UserModel({
                        username,
                        password: hashedPassword,
                        profile:profile || '',
                        email
                    });

                    //return save result as a response 
                    user.save()
                    .then(result => res.status(201).send({msg:"user Register Success"}))
                     .catch(error => res.status(500).send({error}))

                }).catch(error =>{
                    return res.status(500).send({
                        error:"enable to Hashed Password"
                    })
                })
            }

        }).catch(error=>{ 
            return res.status(500).send({error })
        })

    }catch(error){
        return res.status(500).send(error);

    }
    
}


/**POST: http://localhost:8080/api/login */
export async function login(req,res){
    const {username, password} = req.body;
    try{
        UserModel.findOne({username})
        .then(user =>{
            // Comparing password with user entered Password 
            bcrypt.compare(password,user.password)
            .then(passwordCheck =>{
                if(!passwordCheck) return res.status(400).send({error:"Don't have Password"})

                // Create JWT Token
                const token = Jwt.sign({
                    userId: user._id,
                    username:user.username
                    
                },ENV.JWT_SECRET,{expiresIn : "24h"});

                return res.status(200).send({
                    msg:"Login Successful...!",
                    username:user.username,
                    token
                })

            })
            .catch(error =>{
                return res.status(400).send({error:"Password Does Not Match"})
            })
        })
        .catch(error =>{
            return res.status(404).send({error:" UserName not found"})
        })

    } catch(error){
        return res.status(500).send({error});
    }
}


/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req,res){
    const {username} = req.params;
    try{
        if(!username)return res.status(501).send({error:"Invalid Username"});

        UserModel.findOne({username}, function(err,user){
            if(err) return res.status(500).send({err});
            if(!user) return res.status(501).send({error:"Couldn't Find the User"});


            // remove password from the User
            // Mongoose return unnecessary data with object so convert it into JSON.
            const {password, ...rest} =  Object.assign({}, user.toJSON());
            return res.status(201).send(rest);
        })
        
    }catch(error){
        return res.status(404).send({error:"Cannot Find User Data.."})
    }
}


/** PUT: http://localhost:8080/api/updateUser
 * we'll make Put req on the above URL and we'll return the userID and the data 
 * we want to update
 * 
 * @param: {
  "id": "<userid>"   
}  
body :{
    firstName:'',
    address:'',
    profile:''
}
 
 */
export async function updateUser(req,res){
    try{
        const {userId} = req.user;
        if(userId){
            const body =req.body;
            // update the data 
            /**MongoDB stores data with property _id */
            UserModel.updateOne({_id: userId}, body, function(err,data){
                if(err) throw err;

                return res.status(201).send({msg:"Record Updated"});

            })


        }else{
            return res.status(401).send({error:"User Not Found"})
        }

    }catch(error){
      return res.status(401).send({error});
       }
}



/** GET: http://localhost:8080/api/genrateOTP */
export async function generateOTP(req,res){
    res.json('genrateOTP Route')
}

export async function verifyOTP(req,res){
    res.json('verifyOTP Route')
}

// Successfully redirect user when OTP is valid
/** GET:  http://localhost:8080/api/createResetSession */
export async function createResetSession(req,res){
    res.json('CreateResetSession Route')
}


// Update the Password when we have valid Session 
/**PUT: http://localhost:8080/api/resetPassword */ 
export async function resetPassword(req,res){
    res.json('Verify Route')
}