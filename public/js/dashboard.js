let ui = new firebaseui.auth.AuthUI(auth);

let login = document.querySelector('.login');

const blogSection = document.querySelector('.blog-section');

auth.onAuthStateChanged((user) => {
    if(user){
        login.style.display = "none";
        getUserWrittenBlogs();
    }else{
        setupLoginButton();
    }
})

const setupLoginButton = () => {
    ui.start("#loginUI", {
        callbacks: {
            signInSuccessWithAuthResult: function(authResult,redirectURL) {
                login.style.display = "none";
                return false;
            }
        },
        signInFlow: "popup",
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    });
} 


//Gather user entries
const getUserWrittenBlogs = () => {
    db.collection("blogs").where("author", "==", auth.currentUser.email.split('@')[0]).get().then((blogs) => {
        blogs.forEach((blog) => {
            createBlog(blog);
        })
    })
    .catch((error) =>{
        console.log("Error getting blogs");
    })
}


// db.collection("blogs").get().then((blogs) => {
//     blogs.forEach(blog => {
//         if(auth.id != decodeURI(location.pathname.split("/").pop())){
//             createBlog(blog);
//         }
//     })
// })


const createBlog = (blog) => {
    let data = blog.data();
    blogSection.innerHTML += `
    <div class= card blog-card">
            <img src="${data.bannerImage}" alt="" class="blog-img">
    
            <h3 class="card-title">${data.title.substring(0, 100) + '...'}</h3>

            <p class="card-text">${data.article.substring(0, 200) + '...'}</p>

            <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <a href="/${blog.id}" alt="Read" data-toggle="tooltip" data-placement="top" title="Read Entry"   class="btn floated"><i class="fas fa-search"></i></a>
    
            <a href="/${blog.id}/composer" alt="Edit" data-toggle="tooltip" data-placement="top" title="Edit Entry"   class="btn floated bedit"><i class="fas fa-edit"></i></a>

            <a href="#" onclick="deleteBlog('${blog.id}')" alt="Delete" data-toggle="tooltip" data-placement="top" title="Delete Entry"   class="btn floated bdelete"><i class="fas fa-trash"></i></a>
          </div>
        </div>
    `;
}


const deleteBlog = (id) => {
    db.collection("blogs").doc(id).delete().then(() => {
        location.reload();
    })
    .catch((error) => {
        console.log("Error deleting the blog");
    })
}