let blogId = decodeURI(location.pathname.split("/").pop());

let docRef = db.collection("blogs").doc(blogId);

docRef.get().then((doc) => {
    if(doc.exists){
        setupBlog(doc.data());
    } else{
        location.replace("/");
    }
})

const setupBlog = (data) => {
    const banner = document.querySelector('.banner');
    const blogTitle = document.querySelector('.title');
    const titleTag = document.querySelector('title');
    const publish = document.querySelector('.published');
    
    banner.style.backgroundImage = `url(${data.bannerImage})`;

    titleTag.innerHTML += blogTitle.innerHTML = data.title;
    publish.innerHTML += data.publishedAt;
    publish.innerHTML += ` -- ${data.author}`;



    const article = document.querySelector('.article');
    addArticle(article, data.article);
}


const addArticle = (ele, data) => {
    data = data.split("\n").filter(item => item.length);
    // console.log(data);

    data.forEach(item => {
        // check for heading
        if(item[0] == '#'){
            let hCount = 0;
            let i = 0;
            while(item[i] == '#'){
                hCount++;
                i++;
            }
            let tag = `h${hCount}`;
            ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`
        } 
        //checking for image format
        else if(item[0] == "!" && item[1] == "["){
            let seperator;

            for(let i = 0; i <= item.length; i++){
                if(item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")"){
                    seperator = i;
                }
            }

            let alt = item.slice(2, seperator);
            let src = item.slice(seperator + 2, item.length - 1);
            ele.innerHTML += `
            <img src="${src}" alt="${alt}" class="article-image">
            `;
        }

        else{
            ele.innerHTML += `<p>${item}</p>`;
        }
    })
}


//FACEBOOK BUTTON
var fbButton = document.getElementById('fb-share-button');
var url = window.location.href;

fbButton.addEventListener('click', function() {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + url,
        'facebook-share-dialog',
        'width=800,height=600'
    );
    return false;
});



// $(function() {
//     var ref = new Firebase("https://notake-website.firebaseio.com/"),
//       postRef = ref.child(slugify(window.location.pathname));
  
//       postRef.on("child_added", function(snapshot) {
//         var newPost = snapshot.val();
//         $(".comments").prepend('<div class="comment">' +
//           '<h4>' + escapeHtml(newPost.name) + '</h4>' +
//           '<div class="profile-image"><img src="http://www.gravatar.com/avatar/' + escapeHtml(newPost.md5Email) + '?s=100&d=retro"/></div> ' +
//           '<span class="date">' + moment(newPost.postedAt).fromNow() + '</span><p>' + escapeHtml(newPost.message)  + '</p></div>');
//       });
  
//       $("#comment").submit(function() {
//         var a = postRef.push();
        
//         a.set({
//           name: $("#name").val(),
//           message: $("#message").val(),
//           md5Email: md5($("#email").val()),
//           postedAt: Firebase.ServerValue.TIMESTAMP
//         });
  
//         $("input[type=text], textarea").val("");
//         return false;
//       });
//   });
  
//   function slugify(text) {
//     return text.toString().toLowerCase().trim()
//       .replace(/&/g, '-and-')
//       .replace(/[\s\W-]+/g, '-')
//       .replace(/[^a-zA-Z0-9-_]+/g,'');
//   }
  
  
//   function escapeHtml(str) {
//       var div = document.createElement('div');
//       div.appendChild(document.createTextNode(str));
//       return div.innerHTML;
//   }

