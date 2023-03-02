// const fileEvent = document.querySelectorAll('.files')
// fileEvent.forEach((element) => {
//   element.addEventListener('click', function () {
//     let name = this.parentNode.innerHTML
//     name = name.split('>')
//     name = name[1]
//     const PDFViewer = document.querySelector('#PDFViewer')
//     PDFViewer.setAttribute('src', `~/formatos-sgm/FSM-01 FORMATO DE MANUALES, PROCEDIMIENTOS Y ANEXOS/${name}`)
//   })
// })
// console.log(document.getElementsByClassName('tree')[0].querySelectorAll('li'))
// const li = document.getElementsByClassName('tree')[0]
// li.forEach((element) => {
//   if (element.querySelector('ul') != null) {
//     element.classList.add('parent_li')
//     element.querySelector('span').setAttribute('title', 'Collapse this branch')
//   }
//   element.style.display = ''
//   element.querySelector('span').addEventListener('click', function (e) {
//     if (this.getAttribute('title') == null) {
//       element.style.display = ''
//     } else {
//       const children = this.parentNode.querySelector('ul').querySelectorAll('li')
//       children.forEach((element) => {
//         if (element.style.display !== 'none' && children) {
//           element.style.display = 'none'
//           this.setAttribute('title', 'Expand this branch')
//         } else {
//           element.style.display = 'block'
//           this.setAttribute('title', 'Collapse this branch')
//         }
//       })
//     }
//     e.stopPropagation()
//   })
// })
// collapse()
// function collapse () {
//   const li = document.querySelector('.tree').querySelectorAll('li')

//   li.forEach((element) => {
//     if (element.querySelector('span').querySelector('img').getAttribute('class').length !== 1) {
//       element.style.display = 'none'
//       element.querySelector('span').setAttribute('title', 'Expand this branch')
//     }
//   })

//   // e.stopPropagation();
// }
