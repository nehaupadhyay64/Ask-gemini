 const questionInput = document.getElementById("question");
 const submitBtn = document.getElementById("submitBtn");
 const answer = document.getElementById("answer");
 
submitBtn.addEventListener("click",async() =>{
const question = questionInput.value;

if (!question.trim()){
    answer.textContent = "Please type a question first...";
    return;
}
submitBtn.disabled =true;
answer.textContent = "Thinking....";

try{
    const response = await fetch("https://ask-gemini-8ed6.onrender.com/ask",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            question:question

        })
    });
const data = await response.json();
console.log("Received from backend:",data);
answer.textContent = data.answer;
}catch(error){
console.log("Fetch error:",error);
answer.textContent = "Something went wrong.Check console...";
}finally{
    submitBtn.disabled = false;
}
});
