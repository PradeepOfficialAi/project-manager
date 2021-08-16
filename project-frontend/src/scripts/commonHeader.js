
export function commonHeader () {


return `    <header>
  <nav
       id="sidebarMenu"
       class="collapse d-lg-block sidebar collapse bg-white"
       >
    <div class="position-sticky">
        <div class="list-group list-group-flush mx-3 mt-4">
        <a
           href="../dashboard.html"
           class="list-group-item list-group-item-action py-2 ripple"
           aria-current="true"
           >
          <i class="fas fa-tachometer-alt fa-fw me-3"></i
            ><span>Dashboard</span>
        </a>
          <a
          href="./crudProject.html"
          class="list-group-item list-group-item-action py-2 ripple"
          ><i class="fas fa-box fa-fw me-3"></i><span>Projects</span></a
         >
          <a
          href="./crudEmploye.html"
          class="list-group-item list-group-item-action py-2 ripple"
          ><i class="fas fa-universal-access fa-fw me-3"></i
         ><span>Employee</span></a
         >
       
      </div>
    </div>
  </nav>
  
  <nav
       id="main-navbar"
       class="navbar navbar-expand-lg navbar-light bg-white fixed-top"
       >
      <button
              class="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
              >
        <i class="fas fa-bars"></i>
      </button>
  
      <a class="navbar-brand" href="#">
        <img
             src="../../asset/pd-logo.png"
             height="40"
             alt=""
             loading="lazy"
             />
      </a>
  
      <ul class="navbar-nav ms-auto d-flex flex-row">
        <li class="nav-item dropdown">
          <a
             class="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
             href="#"
             id="navbarDropdownMenuLink"
             role="button"
             data-mdb-toggle="dropdown"
             aria-expanded="false"
             >
            <img
                 src="../../asset/contact.png"
                 class="rounded-circle"
                 height="40"
                 alt=""
                 loading="lazy"
                 />
          </a>
          <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
              >
            <li><a class="dropdown-item" href="#">My profile</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><a class="dropdown-item" href="#">Logout</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
  </header>`
}