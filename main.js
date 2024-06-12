import './style.css'
import dayjs from 'dayjs';

let formInput = document.getElementById("formInput")
let parent = document.getElementById("parent")

function createData(event){
  event.preventDefault();

  let note = event.target.note.value;

  // console.log(note)
  // [{""}, {""}, {""}]
  let noteStorage = localStorage.getItem("noteStorage")

  if(noteStorage==null){
    localStorage.setItem("noteStorage", "[]")
  }
// kita dapatkan data dari storage "[]"
  noteStorage = localStorage.getItem("noteStorage")
// kita pecahkan atau uraikan biar stringnya lepas
let noteDataJson = JSON.parse(noteStorage)
// []
// kita push data object kedalam notDataJson
noteDataJson.push({
  id : dayjs().format(),
  note : note,
  date : dayjs().format()
})

event.target.note.value = " ";
// kita ubah kembali datanya dalam bentuk string
localStorage.setItem("noteStorage", JSON.stringify(noteDataJson))
alert("Data berhasil disimpan");
window.location.reload();

}

function NoteCard(id, content, date){

  // kita buat elemen div
  let div = document.createElement("div");
  div.setAttribute("id", id)
  div.setAttribute("class", "w-full min-h-[120px] p-2 mt-4 flex flex-col bg-black shadow-md rounded-md relative")

  // buat element p
  let p = document.createElement("p");
  p.setAttribute("class", "font-light text-white")
  p.textContent = content;

  //buat element small
  let small = document.createElement("small");
  small.setAttribute("class", "italic text-slate-500 text-xs mt-auto")
  small.textContent= date;

  // buat element button close 
  let buttonClose = document.createElement("button");
  buttonClose.setAttribute("class", "w-10 h-10 bg-red-500 flex justify-center items-center rounded-md absolute right-2 top-2 text-white")
  buttonClose.textContent= "X";
  buttonClose.addEventListener("click", ( )=>{deleteCard(id)});

  // kita masukan element p, small, dan button ke dalam element div
  div.appendChild(p);
  div.appendChild(small);
  div.appendChild(buttonClose);

  return div;
}

// function untuk merender data dari localstorage ke html
function renderToHtml(){

  // kita ambil data dari localstorage
  let noteStorage = localStorage.getItem("noteStorage");

  // jika tidak ada data di localstorage maka abaikan
  if(noteStorage==null){
      return;
  }

  // ubah data string dari storage data menjadi object
  let storageDataJson = JSON.parse(noteStorage);
  
  // maping data dari storageDataJson ke html
  storageDataJson.reverse().map((e)=>{
      parent.appendChild(NoteCard(e.id, e.note, e.date))
  })
}

function deleteCard(id){
  window.confirm("apakah anda ingin delete data?")
  if(!confirm){
    return;
  }
  let noteStorage = localStorage.getItem("noteStorage")
  
  let noteStorageJson = JSON.parse(noteStorage);
  
  // filter data array
  let newArray = noteStorageJson.filter((e)=>{
  return e.id != id;
  // 2 != 3 => true
  // 3 != 3 => false
  })
  
  localStorage.setItem("noteStorage", JSON.stringify(newArray))

window.location.reload();
}

renderToHtml();



formInput.addEventListener("submit", createData)