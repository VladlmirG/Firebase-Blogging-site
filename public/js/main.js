const blogSection = document.querySelector('.blog-section');


db.collection("blogs").orderBy("publishedAt", "desc").get().then((blogs) => {
    blogs.forEach(blog => {
        if(blog.id != decodeURI(location.pathname.split("/").pop())){
            createBlog(blog);
        }
    })
})


const createBlog = (blog) => {
    let data = blog.data();
    blogSection.innerHTML += `
    <div class= card blog-card">
        
            <img src="${data.bannerImage}" alt="" class="blog-img">
    
            <h3 class="card-title">${data.title.substring(0, 100) + '...'}</h3>

            <p class="card-text">${data.article.substring(0, 200) + '...'}</p>

            <a href="/${blog.id}" class="btn dark">read more<spam class="blink">_</spam></a>
           
        </div>
    `;
}



