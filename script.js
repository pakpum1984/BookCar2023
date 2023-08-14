


const URL = "https://script.google.com/macros/s/AKfycbwzFi5nCy368wwh8QrbPHu8kOFyuB3qhptWeYXvNUHhWUwo8afAaNQ8Ld9z2gpP6NW5iA/exec"
let personData = ""
let sortDirection = false;
let texD = false
const emgtoast = document.getElementById("emgtoast")
const emgtoastA = document.getElementById("emgtoastA")
let allData 
const countshow = document.getElementById("countshow")

const dateStd = document.getElementById("datestd")
const nameStd = document.getElementById("namestd")
const depStd = document.getElementById("depstd")
const carStd = document.getElementById("carstd")
const locaStd = document.getElementById("locastd")
const idStd = document.getElementById("idstd")
const noteStd = document.getElementById("notestd")
const statusStd = document.getElementById("statusstd")
const approverStd = document.getElementById("approverstd")
const formRegis = document.querySelector("form")
const searchinput = document.getElementById("searchinput")

/** ฟังก์ชั่น สำหรับการค้นหา */
function searchData(){
    
    searchinput.addEventListener('keyup',(e)=>{
        console.log(allData)
        let dataAfterSearch = allData.filter((f)=>{
            let searchinputVal = searchinput.value
            return (
                f.name.toLowerCase().includes(searchinputVal)
            );
        });
        loopForShowData(dataAfterSearch)
        
    });
}

/** Event ปุ่ม Submit form เก็บค่าต่างๆ ใน form แล้วเก็บเป็น ตัวแปลชนิด object เพื่อเตรียมส่งตัวแปลไปที่ฟังก์ชั่น appendData  */
// formRegis.addEventListener('submit',(e)=>{
//     e.preventDefault()
//     emgtoastA.src = "https://cdn-icons-png.flaticon.com/512/907/907027.png"
//     document.querySelector("#thd").style.backgroundColor = "red"
//     document.querySelector("#thd").style.color = "white"
//     document.getElementById("tea").innerHTML = "บันทึกข้อมูล"
//     document.getElementById("msga").innerHTML = "กำลังบันทึก รอสักครู่..."
//     new bootstrap.Toast(document.querySelector('#basicToastB')).show();


//     let formObj = e.target
//     if(idStd.value == "" || nameStd.value == "" || classStd.value == "" || roomStd.value == "" || ageStd.value == ""){
//         emgtoastA.src = "https://cdn-icons-png.flaticon.com/512/907/907027.png"
//         document.getElementById("tea").innerHTML = "ผิดพลาด"
//         document.getElementById("msga").innerHTML = "ตรวสอบการป้อนข้อมูลไม่ครบ"
//         document.querySelector("#thd").style.backgroundColor = "red"
//         document.querySelector("#thd").style.color = "white"
//         return new bootstrap.Toast(document.querySelector('#basicToastB')).show();
//     }else{
//     let obj = {}
//         obj.idValue = idStd.value
//         obj.nameValue = nameStd.value
//         obj.classValue = classStd.value
//         obj.roomValue = roomStd.value
//         obj.nicknameValue = nickname.value
//         obj.ageValue = ageStd.value

//         appendData(obj).then((data)=>{
//             console.log(data)
//             getData()
//           })

//          formRegis.reset()
//         }
// })



/**  เพิ่มข้อมูลลง Google Sheet ด้วยการส่งข้อมูล method POST และรับค่าที่ทางฝั่ง ggsheet ส่งกลับมา  */ 
// const appendData = (async(obj)=>{
//     console.log(obj)
//     const url = URL
//     const formData = new FormData();
//     formData.append('objs', JSON.stringify(obj))

//     const response = await fetch(url+"?type=append", {
//     method: 'POST',
//     body: formData
//     })
//     emgtoastA.src = "https://cdn-icons-png.flaticon.com/512/907/907027.png"
//     document.querySelector("#thd").style.backgroundColor = "green"
//     document.querySelector("#thd").style.color = "white"
//     document.getElementById("tea").innerHTML = "บันทึกข้อมูล"
//     document.getElementById("msga").innerHTML = "ข้อมูลบันทึกลงชีตเรียบร้อยแล้ว"
//     new bootstrap.Toast(document.querySelector('#basicToastB')).show();

//   const json = response.json()
//   return json
//   })


  /**  เมื่อโหลด หน้า Window ให้แสดงข้อมูลและเตรียม Event ค้นหาด้วย 2 ฟังก์ชั่น คือ getData(),searchData() */ 
window.onload = ()=>{
    
    document.getElementById("showtxt").innerHTML = "เริ่มการโหลดข้อมูล..."
    new bootstrap.Toast(document.querySelector('#basicToast')).show();
    emgtoast.src = "https://cdn-icons-png.flaticon.com/512/814/814848.png"
    getData()
    searchData()
    
}

/** ดึงข้อมูลมาแสดงที่หน้า web โดยfetch เรียกข้อมูล API ที่สร้างจาก ggsheet โดยกำหนด type = 1 ตามที่กำหนดใน ggSheet */ 
async function getData(){
    // console.log("OKGood Getdata")
    let ad = new Date().getTime()
   
    const url1 = `${URL}?type=1`;
    const formData = new FormData();
    formData.append('ids','30250')

    const res = await fetch(url1,{
        method: 'POST',
        body: formData
    });
    const data = await res.json()
    let fd = new Date().getTime()
    
const fds = parseFloat((fd-ad)/1000).toFixed(1)
    document.getElementById("sc").innerHTML = `ใช้เวลา ${fds} วินาที`
    document.getElementById("showtxt").innerHTML = "ข้อมูลพร้อมใช้งาน"
    emgtoast.src = "https://cdn-icons-png.flaticon.com/512/3032/3032885.png"
    document.querySelector(".toast-header").style.backgroundColor = "green"
    document.querySelector(".toast-header").style.color = "white"
    new bootstrap.Toast(document.querySelector('#basicToast')).show();
    allData = data.data
  
    console.log(allData)
    getTenObjectData(data.data)
    
}

/** รับ id จากปุ่มลบข้อมูลในตาราง และ sweet alert การลบข้อมูล หากกดปุ่ม Yes ให้เรียกฟังก์ชั่น JobDelete และ ฝาก id นักเรียนไปด้วยเพื่อเตรียมค้นหา */ 
function deleteData(id){

    Swal.fire({
        position:'top',    
        title: 'Are you sure?',
        text: "You want remove this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cencel',
          confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.isConfirmed) {

              JobDelete(id)
            }
        })
    }

/** รับค่า id เพื่อส่งข้อมูลไปหา API ใน Google sheet เพื่อลบ Row โดยอ้างอิงตาม id นักเรียน และ แสดงผลการลบ */ 
async function JobDelete(id){
    console.log(id)
    let objOfRemove = {}
    objOfRemove.idRemove = id
    const url = URL
    const formData = new FormData();
    formData.append('objs', JSON.stringify(objOfRemove))
    const response = await fetch(url+"?type=remove", {
    method: 'POST',
    body: formData
    })
    emgtoastA.src = "https://cdn-icons-png.flaticon.com/512/907/907027.png"
    document.querySelector("#thd").style.backgroundColor = "red"
    document.querySelector("#thd").style.color = "white"
    document.getElementById("tea").innerHTML = "ลบข้อมูล"
    document.getElementById("msga").innerHTML = "ลบข้อมูลที่ชีตเรียบร้อยแล้ว"
    new bootstrap.Toast(document.querySelector('#basicToastB')).show();

  const json = await response.json()
  console.log(json)
  formRegis.reset() //reset form
  getData() // เริ่มการรับข้อมูลใหม่
  searchData() 
  return json

}

/** ค้นหา ข้อมูลนักเรียนเพื่อแสดงเมื่อ คลิกที่ Row ในตาราง เพื่อแสดงข้อมูลจากตารางที่คลิก ในส่วน ฟอร์ม */ 
// function editdata(e){
//     const idoninput = e.dataset.idrow
//     console.log(idoninput)

//        let arrOfFilter = allData.filter((f)=>{
//         // console.log(f.id)
//         return f.id === parseInt(idoninput)
//     })
//     //    console.log(arrOfFilter)

//     const nameoninput = e
//     idStd.value = idoninput
//     nameStd.value = arrOfFilter[0].name
//     classStd.value = arrOfFilter[0].class
//     roomStd.value = arrOfFilter[0].room
//     nicknameStd.value = arrOfFilter[0].nickname
//     ageStd.value = arrOfFilter[0].age
    

// }

/** ส่วนของการสร้าง Row ในตารางตามคอลัมน์ ที่กำหนด พร้อมเปรียบเทียบจำนวนเพื่อจัดรูปแบบการแสดงตาราง */ 
    function loopForShowData(data) {
        //  console.log(data)
        const tableBody = document.getElementById('tableData')
        let textHtml = ``;
        personData=data
        // console.log(data)
        
        data.forEach((students,row) => {
            // console.log(students)
            if(row>=10){
                textHtml +=
                  `<tr>
                   <td>${students.date}</td>
                   <td>${students.name}</td>
                   <td>${students.dep}</td>
                   <td>${students.car}</td>
                   <td>${students.loca}</td>
                   <td>${students.id}</td>
                   <td>${students.note}</td>
                   <td>${students.status}</td>
                   <td>${students.approve}</td>
                   </tr>`
            }else{
                textHtml += 
                  `<tr>
                   <td>${students.date}</td>
                   <td>${students.name}</td>
                   <td>${students.dep}</td>
                   <td>${students.car}</td>
                   <td>${students.loca}</td>
                   <td>${students.id}</td>
                   <td>${students.note}</td>
                   <td>${students.status}</td>
                   <td>${students.approve}</td>
                  </tr>`
            }    
            
        });
        tableBody.innerHTML = textHtml
    }

/** Event เพื่อรับค่าชื่อ Column เพื่อเปรียบเทียบกับ key ของ Object ข้อมูล ว่าข้อมูล เป็น ชนิด Number หรือ String */ 
    function sortColumn(columnName){
        // console.log(columnName)
        // console.log(personData)
        const datyType = typeof personData[0][columnName];
        sortDirection = !sortDirection
        // console.log(datyType)
        switch(datyType){
            case 'number':
                sortNumberColumn(sortDirection,columnName)
                break;
            case 'string':
                sortNumberColumnB(sortDirection,columnName)
                    break;                    
        }
        
        // console.log(personData)
        loopForShowData(personData)  
    }

    /** เรียงข้อมูลชนิดตัวเลข โดยตรวจสอบทิศทางการจัดเรียงข้อมูลก่อน  */ 
    function sortNumberColumn(sort,columnName){
        testnode()
        // console.log(columnName)
        personData = personData.sort((p1,p2)=>{
            return sort ? p1[columnName] - p2[columnName] : p2[columnName] - p1[columnName]
        })
    }
    /** เรียงข้อมูลชนิดString โดยตรวจสอบทิศทางการจัดเรียงข้อมูลก่อน  */ 
    function sortNumberColumnB(sort,columnName){
        testnode()
        if(texD === false){
            personData = personData.sort((a, b) => {
                let fa = a.name.toLowerCase(),
                    fb = b.name.toLowerCase();
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;

            });
            texD = true
        }else if(texD === true){
            personData = personData.sort((a, b) => {
                let fa = a.name.toLowerCase(),
                    fb = b.name.toLowerCase();
                if (fa > fb) {
                    return -1;
                }
                if (fa < fb) {
                    return 1;
                }
                return 0;
            });
            texD = false
        }        
    }

    // document.querySelector("#basicToastBtn").onclick = function() {
    //     new bootstrap.Toast(document.querySelector('#basicToast')).show();
    //     document.getElementById("showtxt").innerHTML = "me"
    //    }

/** สลับการแสดงและซ่อน font awesome ตัวนำทางค้นหา  */ 
function testnode(){
       let arrnode = document.querySelectorAll('i')

       arrnode.forEach((r)=>{
           // console.log(r)
           if(r.classList == "fa-solid fa-sort-down"){
               // console.log("ddd")
               r.classList.remove('fa-sort-down')
               r.classList.add('fa-sort-up')
           }else{
               r.classList.add('fa-sort-down')
               r.classList.remove('fa-sort-up')
           }
       })
    }

/** ดึงข้อมูลมาแสดงจำนวน 10 record สุดท้าย */ 
    function getTenObjectData(data){
        let lengthAllData = allData.length
        let lastData = allData[lengthAllData-1]
        idStd.value = lastData.id + 1

        let lengthData = data.length
        
        if(lengthData>=10){
            let dataShowp = Object.entries(data).slice(lengthData-10,lengthData).map(entry => entry[1]);
            // console.log(data)
            document.getElementById("countRow").innerHTML = `(ข้อมูล ${dataShowp.length}/${lengthData} แถว) `
            return loopForShowData(dataShowp)
           }else{
            let dataShowp = data
            document.getElementById("countRow").innerHTML = `(ข้อมูล ${dataShowp.length}/${lengthData} แถว) `
            return loopForShowData(dataShowp)
           }

    }

/** ควบคุมการแสดง Toast bootstrap  */ 
    document.getElementById("btntoast").addEventListener("click",()=>{
        loopForShowData(allData)
        document.getElementById("countRow").innerHTML = `(ข้อมูล ${allData.length}/${allData.length} แถว) `
        document.getElementById("showtxt").innerHTML = "แสดงข้อมูลทั้งหมดแล้ว"
        document.getElementById("sc").innerHTML = ``
        emgtoast.src = "https://cdn-icons-png.flaticon.com/512/5579/5579233.png"
        document.querySelector(".toast-header").style.backgroundColor = "green"
        document.querySelector(".toast-header").style.color = "white"
        new bootstrap.Toast(document.querySelector('#basicToast')).show();
    })

    // document.getElementById("cutRow").addEventListener("click",()=>{
    //     getTenObjectData(allData)
    //     document.getElementById("showtxt").innerHTML = "แสดงข้อมูล 10 แถวล่าสุดแล้ว"
    //     document.getElementById("sc").innerHTML = ``
    //     emgtoast.src = "https://cdn-icons-png.flaticon.com/512/6912/6912885.png"
    //     document.querySelector(".toast-header").style.backgroundColor = "green"
    //     document.querySelector(".toast-header").style.color = "white"
    //     new bootstrap.Toast(document.querySelector('#basicToast')).show();
    // })

    /** ควบคุมการแสดง ข้อมูลตามจำนวนที่เลือกในส่วน option ที่ให้เลือกจำนวนแสดงข้อมูล  */ 
    countshow.addEventListener("change",()=>{
        let countshowval = countshow.value

        let lengthData = allData.length
        // console.log(typeof +countshowval)
        
        if(lengthData>=+countshowval){
            let dataShowp = Object.entries(allData).slice(lengthData-(+countshowval),lengthData).map(entry => entry[1]);
            // console.log(data)
            document.getElementById("countRow").innerHTML = `(ข้อมูล ${dataShowp.length}/${lengthData} แถว) `
            return loopForShowData(dataShowp)
           }

    })

