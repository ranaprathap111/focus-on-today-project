const checkBoxList =document.querySelectorAll('.custom_checkbox');
const inputFields=document.querySelectorAll('.input_text');
const errorLabel=document.querySelector('.label-setgoal')
const progressBar =document.querySelector('.progress-bar')
const progressValue=document.querySelector('.progress-value')
const labeText = document.querySelector('.labeltext')

allComplement=[
 'Raise the bar by completing your goals!',
  'Well begun is half done!',
  'Just a step away, keep going!',
  'Wow! You just completed all the goals, time for chill 😊.',
]


 const allGoals= JSON.parse(localStorage.getItem('allGoals')) || {
    first:{
        name:'',
        completed:false
    },
    second:{
        name:'',
        completed:false
    },
    third:{
        name:'',
        completed:false
    }
 }

 let completedGoalsCount=Object.values(allGoals).filter((goal) => goal.completed).length
     progressValue.style.width = `${(completedGoalsCount / 3 )*100}%`
    progressValue.firstChild.innerText= `${completedGoalsCount}/3 completed`
    labeText.innerText = allComplement[completedGoalsCount]

checkBoxList.forEach((checkbox) =>{
    checkbox.addEventListener('click',()=>{ 
        const allinputFields=[...inputFields].every(function(input){
            return input.value
        })
        if(allinputFields){
            checkbox.parentElement.classList.toggle('completed')

            const inputId=checkbox.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed
            completedGoalsCount=Object.values(allGoals).filter((goal) => goal.completed).length

            progressValue.style.width = `${(completedGoalsCount / 3 )*100}%`
            progressValue.firstChild.innerText= `${completedGoalsCount}/3 completed`
            labeText.innerText = allComplement[completedGoalsCount]
            localStorage.setItem('allGoals',JSON.stringify(allGoals))

        }
        else(
            progressBar.classList.add('show-error')
        )
    })
})

inputFields.forEach((input)=> {
    
    input.value = allGoals[input.id].name

    if(allGoals[input.id].completed){
        input.parentElement.classList.add('completed')
    }  
 
    input.addEventListener('focus',() => {
        progressBar.classList.remove('show-error')
    })

    input.addEventListener('input',(e)=> { 

            if(allGoals[input.id].completed){
            input.value = allGoals[input.id].name
            return
        }
        allGoals[input.id].name=input.value  
        //   or.... allGoals [input.id]={
        //     name : input.value,
        //     completed : false
        // }
       
        localStorage.setItem('allGoals',JSON.stringify(allGoals))
    })
    
})    