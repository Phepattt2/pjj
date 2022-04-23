import React from "react";
import { useState ,useEffect } from "react";
import Address from "../../assets/pics/Address.png";
import Company1 from "../../assets/pics/Company1.png";
//import axios from "axios";
import ReactPaginate from "react-paginate";
import axios from "axios";
import "./Searchresult.css"; 
const API_PROVINCE = 'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json'


/* Pagination */
function Send_data() {

  
  const [JsonData,setJsonData]=useState([])
  fetchJsonData()
  console.log('JsonData',JsonData)
  const [provinces,setProvice] = useState([]) 

  async function fetchJsonData(){  
    const response = await axios.post(process.env.REACT_APP_API+'/search')
    const data = await response.json() 
    setJsonData(data)
  }

  async function fetchProvincesName(){  
    const response = await fetch(API_PROVINCE)
    const data = await response.json() 
    setProvice(data)
  }
  useEffect(()=> {
    fetchProvincesName()
  },[])

  const [value,setValue] = useState({
    college :'',
    program : '',
    faculty : '',
    jobType : '',
    wageMin : 0,
    wageMax : 0,
    address : '',
    companyName : '' ,
    boost : true,
    // image file test
    img : ''
  })

  const isNumberInput =(e)=>{
    var char = String.fromCharCode(e.which)
    if(!(/[0-9]/.test(char))){
      alert('Please Enter Number')
      e.preventDefault()
    }
  }

  const handleChange = (e) => {
    console.log(e.target.name ,e.target.value )
    setValue({
      ...value,
      [e.target.name]:e.target.value
    })
  }
  
  const handleSubmit = (e) => {

    e.preventDefault()

    let keyV = ['college' ,'program','faculty','jobType' ,'wageMin' ,'wageMax' ,'address' ,'boost' ,'companyName','img']
    for (var i =0 ; i < keyV.length ;i++){
      if (value[keyV[i]] === '' || value[keyV[i]] === 0){
        delete value[keyV[i]]
      }
    }
    console.log('value',value)
    axios.post(process.env.REACT_APP_API+'/search',value)
    .then(res => {
      console.log('respond is ',res.data)
      console.log('respond length is ',res.data.length)
      JsonData = res.data
      displayUsers()
    })

}


  const [users, setUsers] = useState(
    JsonData.slice(0, 20)
  ); /* เลือกผู้ใช้ 20 คน */
  const [pageNumber, setPageNumber] =
    useState(0); /* คลิกที่ปุ่มเเบ่งหน้า state จะเปลี่ยน */

  const usersPerPage = 3; /* หน้านึงเเสดง 3 บล็อก */
  const pagesVisited =
    pageNumber *
    usersPerPage; /* ตัวเเปรที่เก็บหน้าเว็บที่เข้าชม = หมายเลขหน้าปจบ. * จน.ผู้ใช้ต่อหน้า เช่น อยู่ใน page 6 มี item 3 อัน จะได้เท่ากับ 18 ผู้ใช้ที่่เข้าชมเว็บ */

  /* เเสดงเป็นบล็อคๆ โชว์ข้อมูลหน้าผู้ใช้ที่ต้องการ -> เวลาเเบ่งหน้าผู้ใช้*/
  var displayUsers = users
    .slice(
      pagesVisited,
      pagesVisited + usersPerPage
    ) /* สมมติอยู่ในหน้าที่ 6 ก็เเสดงว่าเราเห็นผู้ใช้มาเเล้ว 18 คน , ต่อไปก็หน้าที่ 7 คือหน้าที่ต้องการอันดับเเรก จึงเปนตัวเเปรนี้ + หน้าที่เยี่ยมชมรวมถึงจน.ผู้ใช้ต่อหน้า หน้าที่ 6 มี item 18 ซึ่ง pagesVisited = 18 + 3 */
    .map((user) => {
      return (
        <div className="">
          {/* ผลการค้นหา ที่เเสดง card ออกมาเป็นบล็อคๆ*/}
          <div className="w-3/4 w-100 h-55 rounded-xl bg-white drop-shadow-md p-2 my-4 font-sans">
            <div className="grid grid-rows-3 grid-flow-col gap-0.5 ">
              {/* ชื่อตำเเหน่งงาน */}
              <div className="row-span-1 col-span-1 ">
                <div className="px-4 py-1.5 focus:outline-none font-bold text-black text-lg ml-2">
                  {user.firstName}
                  {/* รอเอาค่าจากหลังบ้านมาใส่ */}
                </div>
              </div>

              {/* ชื่อบริษัท */}
              <div className="row-span-1 col-span-1 ">
                <div className=" px-4 py-1.5  focus:outline-none text-black ml-2">
                  {user.lastName}
                  {/* รอเอาค่าจากหลังบ้านมาใส่ */}
                </div>
              </div>

              {/* logo company */}
              <div className="row-span-3 ml-20 grid justify-items-center">
                <div className="w-20 h-20 rounded-xl bg-[#E2E2E2] ">
                  <img
                    src={Company1} //ลองใส่รูปไปก่อน รอดึง logo จากหลังบ้าน
                    alt="logoCompany"
                    span="location"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row">
              {/* logo address */}
              <img
                src={Address}
                alt="logoAddress"
                className=" h-5 w-5 ml-8"
                span="location"
              />
              {/* ที่อยู่ address บริษัท */}
              <div className="px-0.5 py-1.5  focus:outline-none ml-2 text-black text-sm">
                {user.email}
                {/* รอเอาค่าจากหลังบ้านมาใส่ */}
              </div>
            </div>
          </div>
        </div>
      );
    });

  const pageCount = Math.ceil(
    users.length / usersPerPage
  ); /*ปัดเศษขึ้น ถ้ามี 20 คน/3 = 6.67 ก้มี 7 หน้า -> หน้าที่ 1-6 หน้าละ 3 user ยกเว้นหน้าที่ 7 มี 2 user  */

  /* ฟังก์ชั่นเปลี่ยนหน้า */
  const changePage = ({ selected }) => {
    setPageNumber(
      selected
    ); /*ตัวเลขที่เราต้องการเลื่อนไปทางขวา set page number = จน.ที่ถูกเลือกเท่านั้น*/
  };

  return (
    <div className="Send_data ">
    <form onSubmit={handleSubmit}> 
      <div className="container w-200  items-center my-5 rounded-xl ">
        <div className="flex flow-row rounded-lg space-x-4 px-4 py-4 ">
          <div className="flex flex-col w-2/4  items-center rounded-xl bg-[#F7FAF7] drop-shadow-lg">
            {/* หน้าค้นหางาน */}
            <div className="flex flex-col w-3/4 gap-3 m-5 ">
              <div className="p-2 font-bold text-black text-2xl ">ค้นหางาน</div>
              <div className="flex flex-col space-y-4 m-2">
                {/* มหาลัย */}
                <label for="college" className="text-black text-xl">
                  มหาลัย
                </label>
                <select
                  name="college"
                  className=" w-100 h-10 rounded-xl bg-white drop-shadow-md "
                  onChange={handleChange}
                >
                  <option></option>
                  <option>ลาดกระบัง</option>
                  <option>ธรรมศาสตร์</option>
                </select>

                {/* คณะ */}
                <label for="faculty" className="text-black text-xl">
                  คณะ
                </label>
                <select
                  name="faculty"
                  className="w-100 h-10 rounded-xl bg-white drop-shadow-md "
                  onChange={handleChange}
                >
                  <option></option>
                  <option>วิศวกรรมศาสตร์</option>
                  <option>แพทยศาสตร์</option>

                </select>

                {/* สาขา */}
                <label for="program" className="text-black text-xl">
                  สาขา
                </label>
                <select
                  name="program"
                  className="w-100 h-10 rounded-xl bg-white drop-shadow-md "
                  onChange={handleChange}
                >
                  <option></option>
                  <option>คอมพิวเตอร์</option>
                  <option>ไฟฟ้า</option>

                </select>

                {/* ประเภทงานทั้งหมด */}
                <label for="jobType" className="text-black text-xl">
                  ประเภทงานทั้งหมด (สาขาอาชีพ)
                </label>
                <select
                  name="jobType"
                  className=" w-100 h-10 rounded-xl bg-white drop-shadow-md "
                  onChange={handleChange}
                >
                  <option></option>
                  <option>Software</option>
                </select>

                {/* สถานที่ทำงาน */}
                <label for="address" className="text-black text-xl">
                  สถานที่ทำงาน
                </label>
                <select
                  name="address"
                  className="w-100 h-10 rounded-xl bg-white drop-shadow-md "
                  onChange={handleChange}
                >
                  <option></option>
                  {provinces.map((item,index)=>
                  <option>{item.name_th}</option>
                  )}

                </select>

                {/* ระบุตำเเหน่งงานหรือชื่อบริษัท */}
                <label for="companyName" className="text-black text-xl">
                  ระบุตำเเหน่งงานหรือชื่อบริษัท
                </label>
                <select
                  name="companyName"
                  className="w-100 h-10 rounded-xl bg-white drop-shadow-md "
                  onChange={handleChange}
                >
                  <option>บริษัทxxx</option>
                </select>

                {/* เงินเดือน*/}
                <label for="wageMin" className="text-black text-xl">
                  เงินเดือน min (บาท)
                </label>
                <input
                  name="wageMin"
                  className="w-100 h-10 first-line:h-10 rounded-xl bg-white drop-shadow-md "
                  onKeyPress={isNumberInput}
                  onChange={handleChange}
                >
                </input>
                {/* เงินเดือน*/}
                <label for="wageMax" className="text-black text-xl">
                  เงินเดือน max(บาท)
                </label>
                <input
                  name="wageMax"
                  className="w-100 h-10 first-line:h-10 rounded-xl bg-white drop-shadow-md "
                  onKeyPress={isNumberInput}
                  onChange={handleChange}
                >
                </input>
                
              </div>
              
              {/* Button Search*/}
              <div className="flex items-center ml-2.5 mt-3 space-y-4 ">
                <button
                  class=" bg-[#24AB82] drop-shadow-md font-bold text-white text-2xl rounded-xl px-6 py-2.5 hover:bg-[#1F795E] hover:ring-2 hover:ring-white "
                  disabled = {(value.wageMin < 0 || value.wageMax < 0) } 
              >
                  ค้นหา
                </button>
              </div>
            </div>
          </div>

          {/* หน้าผลการค้นหา */}
          <div className="flex flex-col w-3/4  items-center rounded-2xl  bg-[#F7FAF7] drop-shadow-lg">
            <div className="flex flex-col w-3/4 gap-5 m-5 ">
              <div className="p-2 font-bold text-black text-2xl border-b-4 border-zinc-400 ">
                ผลการค้นหา
              </div>
              <div className="flex flex-col w-full h-full ">
                {displayUsers} 
                <div className="flex h-50  mt-5">
                  {/* ปุ่มเปลี่ยนหน้า */}
                  <ul className="button-list">
                      <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount} /*นับจำนวนหน้า*/
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                      />
                  </ul>
                </div>
              </div>

              {/* ผลการค้นหา */}
            </div>
          </div>
        </div>
      </div>
    </form>
    </div>
  );
}

export default Send_data;
