let ul = document.querySelector('.links-container');

auth.onAuthStateChanged((user) =>{
    if (user){
        // loggin pragma
        ul.innerHTML += `
        <li class="link-item nav-item text-center px-3 pt-3"><a href="/admin" class="link"> Dashboard</a></li>
        <li class="link-item nav-item text-center px-3 pt-3"><a href="#" onclick="logoutUser()" class="blogout"> Logout</a></li>
        `
    } else{
        // no logs
        ul.innerHTML += `
        <li class="link-item nav-item text-center px-3 pt-3"><a href="/admin" class="blogin"> Login</a></li>
        `
    }
})