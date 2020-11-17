// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBX4COQjeZ-hRELWftPZW29X1uwYuwSQ3c",
  authDomain: "pikadu-web-1f5ac.firebaseapp.com",
  databaseURL: "https://pikadu-web-1f5ac.firebaseio.com",
  projectId: "pikadu-web-1f5ac",
  storageBucket: "pikadu-web-1f5ac.appspot.com",
  messagingSenderId: "433442003371",
  appId: "1:433442003371:web:d897c892a93c2d0f109aee"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 

// простая валидация email
const regExpValidEmail = /^\w+@\w+\.\w{2,}$/; 

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');
const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');
const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');
const editUsername = document.querySelector('.edit-username');
const editPhotoURL = document.querySelector('.edit-photo');
const userAvatarElem = document.querySelector('.user-avatar');
const postsWrapper = document.querySelector('.posts');
const btnNewPost = document.querySelector('.button-new-post');
const addPostElem = document.querySelector('.add-post');

const listUsers = [
  {
    id: '01',
    email: 'devasvit@gmail.com',
    password: '12345',
    displayName: 'DevASVit',
    photo: 'https://vesti.ua/wp-content/uploads/2020/05/samaya-krasivaya-devushka-v-mire-800x530.jpg'
  },
  {
    id: '02',
    email: 'maks@gmail.com',
    password: '123456',
    displayName: 'Maks',
    photo: 'https://g4.delphi.lv/images/pix/438x438/A-f21cUJAv0/virietis-ideals-47746713.jpg'
  }
];

const setUsers = {
  user: null,
  logIn(email, password, handler) {
    // метод test проверят совпадение
    if(!regExpValidEmail.test(email)) return alert('email не валиден');
    const user = this.getUser(email);

    if(user && user.password === password) {
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с такими данными не найден');
    }
  },
  logOut(handler) {
    this.user = null;
   
    if(handler) {
      handler();
    }
  },
  signUp(email, password, handler) {
    if(!regExpValidEmail.test(email)) return alert('email не валиден');
    
    //метод trim убирает пробелы слева и справа
    if(!email.trim() || !password.trim()) {
      alert('Введите необходимые данные');
      return;
    } 

    if(!this.getUser(email)) { 
      const user = {email, password, displayName: email.substring(0, email.indexOf('@'))};
      listUsers.push(user);
      this.authorizedUser(user);
      
      if(handler) {
        handler();
      }
    } else {
      alert('Пользователь с таким email уже зарегистрирован')
    }
  },
  editUser(userName, userPhoto, handler) {
    if(userName) {
      this.user.displayName = userName;
    }

    if(userPhoto) {
      this.user.photo = userPhoto;
    }
    
    if(handler) {
      handler();
    }
  },
  getUser(email) {
    return listUsers.find(item => item.email === email)
  },
  authorizedUser(user) {
    this.user = user;
  }
};

const setPosts = {
  allPosts: [
    {
      title: 'Заголовок поста1',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
      tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
      author: {displayName: 'DevASVit', photo: 'https://vesti.ua/wp-content/uploads/2020/05/samaya-krasivaya-devushka-v-mire-800x530.jpg'},
      date: '11.11.2020, 20:54:00',
      like: 15,
      comments: 20
    },
    {
      title: 'Заголовок поста2',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt inventore facere amet commodi numquam eveniet a consequuntur consequatur vitae cum atque repudiandae perferendis distinctio quisquam alias, quo neque enim beatae officiis tempore labore assumenda itaque. Possimus officiis fugiat, maxime quae quas vitae a aspernatur dignissimos ex molestiae obcaecati ut minima deserunt similique adipisci eligendi, tenetur amet illo. Voluptate, eaque deserunt?',
      tags: ['свежее', 'новое', 'мое', 'случайность'],
      author: {displayName: 'Maks', photo: 'https://g4.delphi.lv/images/pix/438x438/A-f21cUJAv0/virietis-ideals-47746713.jpg'},
      date: '10.11.2020, 20:54:00',
      like: 45,
      comments: 12
    }
  ],
  addPost(title, text, tags, handler) {
    this.allPosts.unshift({
      title,
      text,
      tags: tags.split(',').map(item => item.trim()),
      author: {
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photo
      },
      date: new Date().toLocaleString(),
      like: 0,
      comments: 0
    });
    
    if(handler) {
      handler();
    }
  }
};

const toggleAuthDom = () => {
  const user = setUsers.user;
  console.log('user:', user);
  
  if (user) {
    loginElem.style.display ='none';
    userElem.style.display ='';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photo || userAvatarElem.src;
    btnNewPost.classList.add('visible');
  } else {
    loginElem.style.display ='';
    userElem.style.display ='none';
    btnNewPost.classList.remove('visible');
    addPostElem.classList.remove('visible');
    postsWrapper.classList.add('visible');
  }
};

const showAddPost = () => {
  addPostElem.classList.add('visible');
  postsWrapper.classList.remove('visible');
}

const showAllPosts = () => {
  let postsHTML = '';
  
  // деструктивное присваивание в аргументе вместо post
  setPosts.allPosts.forEach(({title, text, date, tags, like, comments, author}) => {
    postsHTML += `
      <section class="post">
        <div class="post-body">
          <h2 class="post-title">${title}</h2>
          <p class="post-text">${text}</p>
          <div class="tags">
            ${tags.map(tag => `<a href="#" class="tag">#${tag}</a>`)}
          </div>
        </div>
        <div class="post-footer">
          <div class="post-buttons">
            <button class="post-button likes">
              <svg width="19" height="20" class="icon icon-like">
                <use xlink:href="img/icons.svg#like"></use>
              </svg>
              <span class="likes-counter">${like}</span>
            </button>
            <button class="post-button comments">
              <svg width="21" height="21" class="icon icon-comment">
                <use xlink:href="img/icons.svg#comment"></use>
              </svg>
              <span class="comments-counter">${comments}</span>
            </button>
            <button class="post-button save">
              <svg width="19" height="19" class="icon icon-save">
                <use xlink:href="img/icons.svg#save"></use>
              </svg>
            </button>
            <button class="post-button share">
              <svg width="17" height="19" class="icon icon-share">
                <use xlink:href="img/icons.svg#share"></use>
              </svg>
            </button>
          </div>
          <div class="post-author">
            <div class="author-about">
              <a href="#" class="author-username">${author.displayName}</a>
              <span class="post-time">${date}</span>
            </div>
            <a href="#" class="author-link"><img src=${author.photo || "img/avatar.jpeg"} alt="avatar" class="author-avatar"></a>
          </div>
        </div>
      </section>
    `;
  });

  postsWrapper.innerHTML = postsHTML;

  addPostElem.classList.remove('visible');
  postsWrapper.classList.add('visible');

};

const init = () => {
  loginForm.addEventListener('submit', event => {
    event.preventDefault(); //отмена стандартного браузерного поведения 
    
    const emailValue = emailInput.value; 
    const passwordValue = passwordInput.value;
    
    setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset(); //очистка полей формы
  });

  loginSignup.addEventListener('click', event => {
    event.preventDefault(); 
    
    const emailValue = emailInput.value; 
    const passwordValue = passwordInput.value;
    
    setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
  });

  exitElem.addEventListener('click', event => {
    event.preventDefault(); 
    
    setUsers.logOut(toggleAuthDom);
  });

  editElem.addEventListener('click', event => {
    event.preventDefault(); 
    
    editContainer.classList.toggle('visible');
    editUsername.value = setUsers.user.displayName;
  });

  editContainer.addEventListener('submit', event => {
    event.preventDefault(); 
    
    setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom)
    editContainer.classList.remove('visible');
  });

  menuToggle.addEventListener('click', function (event) {
    // отменяем стандартное поведение ссылки
    event.preventDefault();
    // вешаем класс на меню, когда кликнули по кнопке меню 
    menu.classList.toggle('visible');
  });

  btnNewPost.addEventListener('click', event => {
    event.preventDefault();
    showAddPost();
  });
  
  addPostElem.addEventListener('submit', event => {
    event.preventDefault();

    const { title, text, tags } = addPostElem.elements;
    
    if (title.value.length < 6) {
      alert('Слишком короткий заголовок');
      return;
    }

    if (text.value.length < 50) {
      alert('Слишком короткий пост');
      return;
    }
    
    setPosts.addPost(title.value, text.value, tags.value, showAllPosts);
    addPostElem.classList.remove('visible');
    addPostElem.reset();
  });

  showAllPosts();
  toggleAuthDom();
};

document.addEventListener('DOMContentLoaded', init);
