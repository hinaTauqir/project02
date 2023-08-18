#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";

let rzlt=false;
let agan=true;
let k=0;
type user={
    user_id: string;
    user_pin:number;
};
type userData={
    name: string;
    bankName:string;
    cardExpDate:string;
    balance:string;
};

let userinfo:user[]=[{user_id:"a12",user_pin:12345},{user_id:"b12",user_pin:12346},
                     {user_id:"c12",user_pin:12347},{user_id:"d12",user_pin:12348},{user_id:"e12",user_pin:12349}];
let userdata:userData[]=[{name:"aa",bankName:"aa",cardExpDate:"1 april",balance:"100RS"},
                        {name:"bb",bankName:"bb",cardExpDate:"2 april",balance:"200RS"},
                        {name:"cc",bankName:"cc",cardExpDate:"3 april",balance:"300RS"},
                        {name:"dd",bankName:"dd",cardExpDate:"4 april",balance:"400RS"},
                        {name:"ee",bankName:"ee",cardExpDate:"5 april",balance:"500RS"}];



function wait(){
   
    return new Promise((resolve,rejects)=>{
        setTimeout(()=>{
         resolve(1);
          },2000);
    })
  }
 
 async function welcome(){
     console.log(`         ${chalk.yellow(`HELLO`)} `);
     let title=chalkAnimation.neon(`                 "WELCOME SIR"\n`);
     await wait();
     title.stop();
 }

 let askQuestion = async()=>{
   while(k<3){
   await inquirer
  .prompt([
    {
        type : "input",
        name: "user_ID",
        message:"please enter your ID"
    },
    {
        type:"password",
        name:"user_PIN",
        message:"enter your password"
    }
  ])
  .then((answers) => {
    for(let i=0;i<userinfo.length;i++){
     if((answers.user_ID==userinfo[i].user_id) && (answers.user_PIN==userinfo[i].user_pin)){
        console.log(`         ${chalk.green('your dats is:')}     \n 
                     ${chalk.yellow('NAME:')}  ${userdata[i].name} \n 
                     ${chalk.yellow('BANK NAME:')}  ${userdata[i].bankName} \n   
                     ${chalk.yellow('CARD EXPIRY DATE:')}  ${userdata[i].cardExpDate} \n  
                     ${chalk.yellow('BALANCE:')}  ${userdata[i].balance}`);
            rzlt=true;      
            k=4; 
           break;
             //console.log(`${chalk.green('your data is:')}     \n  ${userdata[i]}`);
     }
    }
     if(!rzlt) {
        console.log (`          ${chalk.red('WRONG ID OR PIN')} \n`);
     if(k<2){ console.log (`plz try again`);  } 
                k++;
     }
  })

} 
    if(k==3){console.log(`          ${chalk.red('INVALID: you are not allowed to login anymore')} \n` );
    agan=false;}
}

 async function again(){
    let response = await inquirer.prompt([
        {
            name:"Again",
            type:"input",
            message:"Do you want to do transaction again y or n"
        }
    ]) ;  
     if((response.Again).toLowerCase()=="y"||(response.Again).toLowerCase()=="yes"){  
        k=0;
       await askQuestion();}
     else if (response.Again.toLowerCase()=="n" || response.Again.toLowerCase()=="no"){ 
                   console.log(`       ${chalk.yellow('THANK YOU')} \n` );
                  agan=false; }
       

 }
 function lastmessage(){
        console.log(`       ${chalk.green('GOOD BYE')} \n   ${chalk.blue('see you again')}`);
 }



async function steps(){
    await welcome();
    await askQuestion();  
    
    while(agan){await again();}
    await lastmessage();
}

steps();