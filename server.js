const express = require('express');
const cors = require('cors');
const knex = require('knex');

const app = express();

app.use(express.json());
app.use(cors());

const db = knex({
  client: 'pg',
  connection: {
    host: '34.93.53.236',
    user: 'postgres',
    password: '1234',
    database: 'postgres',
  }
});

// db.select().from('user').then(data => { console.log(data)})

const admin = {
	email: 'admin@gmail.com',
	password: 'admin'
}

const ac_coach_composition = ['LB','LB','UB','UB','SL','SU','LB','LB','UB','UB','SL','SU','LB','LB','UB','UB','SL','SU'];
const sleeper_coach_composition = ['LB','MB','UB','LB','MB','UB','SL','SU','LB','MB','UB','LB','MB','UB','SL','SU','LB','MB','UB','LB','MB','UB','SL','SU']

var pnr = 101;

app.get('/', (req,res) => { res.send('it is working') })

app.listen(3000, ()=> { console.log('app is running on port 3000') })

app.post('/signinuser', (req, res) => {
	const {email, password} = req.body;
    
    db.select('emailid','password').from('users')
      .where('emailid', '=', email)
      .then(data => {
          if(data[0].password === password)
          	 res.json('success')
          else
          	res.status(400).json('unable to login')
      })
      .catch(err => res.status(400).json('unable to login'))
}) 

app.post('/signinadmin', (req, res) => {
	if (req.body.email === admin.email && req.body.password === admin.password){
		res.json('success');
	}
	else{
	    res.status(400).json('unable to login');
	}
})

app.post('/register', (req, res) => {
	const {name, email, password, address, mobile} = req.body;
 
    if(!name || !email || !password || !address || !mobile)
     return res.status(400).json('unable to register');

	db('users')
       .returning('*')
	   .insert({
		   name: name,
		   emailid: email,
		   password: password,
		   address: address,
		   mobile: mobile
	     })
	    .then(user => {
	    	res.json(user[0]);
	    })
	    .catch(err => res.status(400).json('unable to register'))
})

app.post('/train_details', (req, res) => {
	const {trainnumber, date, sleeper, ac} = req.body;
	
    if(!trainnumber || !ac || !sleeper || !date)
      return res.status(400).json('Fill all the details');
    
    db.select('train_id','date_of_journey')
      .from('train_details')
      .where({
      	train_id: trainnumber,
      	date_of_journey: date
      })
      .then(data => {
      	 if(data.length !== 0)
      	 	res.status(400).json('Train Already exist on the same date') 
      })
      .catch(err => res.status(400).json('unable to add train'))


	db('train_details')
       .returning('*')
	   .insert({
		   train_id: trainnumber ,
		   date_of_journey: date,
		   sleeper: sleeper,
		   ac: ac,
       sleeper_seats_booked: 0,
       ac_seats_booked: 0
	     })
	    .then(user => {
	    	res.json('success');
	    })
	    // .catch(err => res.status(400).json(err))
	    .catch(err => res.status(400).json('Error in adding train in booking system'))

})

app.post('/profile', (req, res) => {
	const {trainnumber, num_of_pass, date, coach} = req.body;

	if(!trainnumber || !num_of_pass || !date || !coach)
		res.status(400).json('complete all details');

  if(num_of_pass <= 0)
    res.status(400).json('Number of passenger should be more than 0');
    
  db('ticket').max('pnr').then(data => {
      //console.log(data);
      if(data[0].max === 'null')
        pnr = 0;
      else
        pnr = data[0].max;
    })
    
    db.select('train_id','date_of_journey','sleeper','ac','ac_seats_booked','sleeper_seats_booked')
      .from('train_details')
      .where({
      	train_id: trainnumber,
      	date_of_journey: date
      })
      .then(data => {
      	 if(data.length === 0)
      	 	res.status(400).json('Train number on the mentioned date is not their in the booking system')
      	 else{
      	    if(coach === 'AC'){
                 const ac_seats = 18*(data[0].ac) - data[0].ac_seats_booked;
                 if(ac_seats >= num_of_pass)
                          res.json('success');
                 else
                 	 res.status(400).json('Seats not available')
               }
      	    else{
                 const sleeper_seats = 24*(data[0].sleeper) - data[0].sleeper_seats_booked;
                 if(sleeper_seats >= num_of_pass)
                          res.json('success');
                 else
                 	 res.status(400).json('Seats not available')
      	    }
      	   }	 
      })
      .catch(err => res.status(400).json('Error!!!'))
})

app.post('/passenger', (req, res) => {
	
    const {details, number_of_pass, coach, train_id, date, agent_email} = req.body;
    console.log (agent_email)
    let ac_seats_booked, sleeper_seats_booked;     
    const tickets = [];
    console.log('PNR value',pnr);
    
    db.select('*')
      .from('train_details')
      .where({
      	train_id: train_id,
      	date_of_journey: date
        })
      .then( data => {
          ac_seats_booked = data[0].ac_seats_booked;
          sleeper_seats_booked = data[0].sleeper_seats_booked;
          
          if(coach === 'AC'){
          	 for(let i=0;i<number_of_pass;i++){
             	const c = 'A' + (Math.trunc(ac_seats_booked/18) + 1);
             	const berth = ac_seats_booked%18 + 1;
             	const type = ac_coach_composition[berth - 1];
             	ac_seats_booked = ac_seats_booked + 1;
              pnr++;

              db('passenger')
             	 .returning('*')
             	 .insert({
             	 	pnr: pnr,
             	 	name: details[i].name,
             	 	age: details[i].age,
             	 	gender: details[i].gender,
             	 	berth: berth,
             	 	type: type,
             	 	coach: c
             	 })
               .then(data => {
                  tickets.push({
                    name: data[0].name,
                    age: data[0].age,
                    gender: data[0].gender,
                    berth: data[0].berth,
                    coach: data[0].coach,
                    type: data[0].type,
                    pnr: data[0].pnr,
                    train_id: train_id,
                    date: date
                  })

                  if(i === (number_of_pass - 1))
                    res.json(tickets);
               })
             	 .catch(err => res.status(400).json("Error!!"))

              db('ticket')
             	 .returning('*')
             	 .insert({
             	 	pnr: pnr,
             	 	train_id: train_id,
             	 	date_of_journey: date
             	 })
             	 .catch(err => res.status(400).json('Error!!')) 
                
              db('booked')
             	 .returning('*')
             	 .insert({
             	 	pnr: pnr,
             	 	agent_email: agent_email
             	 })
             	 .catch(err => res.status(400).json('Error!!'))

              db('train_details')
                .where({
                train_id: train_id,
                date_of_journey: date
                })
               .increment('ac_seats_booked', 1)
               .catch(err => res.status(400).json('Error!!'))
  
             }
           }
          
          else{
             for(let i=0;i<number_of_pass;i++){
             	const c = 'S' + (Math.trunc(sleeper_seats_booked/24) + 1);
             	const berth = sleeper_seats_booked%24 + 1;
             	const type = sleeper_coach_composition[berth - 1];
             	sleeper_seats_booked = sleeper_seats_booked + 1;
             	pnr++;
             	
              db('passenger')
             	 .returning('*')
             	 .insert({
             	 	pnr: pnr,
             	 	name: details[i].name,
             	 	age: details[i].age,
             	 	gender: details[i].gender,
             	 	berth: berth,
             	 	type: type,
             	 	coach: c
             	 })
               .then(data => {
                  tickets.push({
                    name: data[0].name,
                    age: data[0].age,
                    gender: data[0].gender,
                    berth: data[0].berth,
                    coach: data[0].coach,
                    type: data[0].type,
                    pnr: data[0].pnr,
                    train_id: train_id,
                    date: date
                  })

                  if(i === (number_of_pass - 1))
                    res.json(tickets);
                })
             	 .catch(err => res.status(400).json('Error!!'))

             	db('ticket')
             	 .returning('*')
             	 .insert({
             	 	pnr: pnr,
             	 	train_id: train_id,
             	 	date_of_journey: date
             	 })
             	 .catch(err => res.status(400).json('Error!!')) 
                
                db('booked')
             	 .returning('*')
             	 .insert({
             	 	pnr: pnr,
             	 	agent_email: agent_email
             	 })
             	 .catch(err => res.status(400).json('Error!!'))

               db('train_details')
                .where({
                  train_id: train_id,
                  date_of_journey: date
                   })
                .increment('sleeper_seats_booked', 1) 
                .catch(err => res.status(400).json('Error!!'))     
             } 
           }
      })
      .catch(err => res.status(400).json("Error!!"))
 
 })

   