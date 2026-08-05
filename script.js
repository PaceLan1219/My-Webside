// ============================
// PaceLan Portfolio V1.0
// JavaScript Functions
// ============================



// 页面加载提示

console.log(
    "Welcome to Pace Lan Portfolio!"
);




// ============================
// Smooth Scroll Enhancement
// ============================


document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {


    link.addEventListener(
        "click",
        function(event){


            event.preventDefault();


            const target =
                document.querySelector(
                    this.getAttribute("href")
                );


            if(target){

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }


        }
    );


});





// ============================
// Scroll Animation
// ============================


const cards =
document.querySelectorAll(
    ".card"
);



const observer =
new IntersectionObserver(

    entries => {


        entries.forEach(
            entry => {


                if(entry.isIntersecting){


                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                    "translateY(0)";


                }


            }
        );


    },

    {
        threshold:0.2
    }

);





cards.forEach(card => {


    card.style.opacity = "0";


    card.style.transform =
    "translateY(30px)";


    card.style.transition =
    "0.6s ease";


    observer.observe(card);


});






// ============================
// Back To Top Button
// ============================



const button =
document.createElement(
    "button"
);



button.innerHTML =
"↑";



button.id =
"topButton";



document.body.appendChild(
    button
);




button.style.position =
"fixed";


button.style.bottom =
"25px";


button.style.right =
"25px";


button.style.width =
"45px";


button.style.height =
"45px";


button.style.borderRadius =
"50%";


button.style.border =
"none";


button.style.background =
"#2563eb";


button.style.color =
"white";


button.style.fontSize =
"22px";


button.style.cursor =
"pointer";


button.style.display =
"none";





window.addEventListener(
    "scroll",
    ()=>{


        if(
            window.scrollY > 400
        ){

            button.style.display =
            "block";


        }
        else{


            button.style.display =
            "none";


        }


    }
);





button.addEventListener(
    "click",
    ()=>{


        window.scrollTo({

            top:0,

            behavior:"smooth"

        });


    }
);