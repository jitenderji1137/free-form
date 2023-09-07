import { Input , Button , Select , Textarea , ButtonGroup , Link , Center , Heading} from "@chakra-ui/react";
import { useRef } from "react"
import { useState , useEffect } from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import axios from 'axios';
import { createClient } from "@supabase/supabase-js";
export default function MyForm() {
  const formRef = useRef(null);
  const [arrr,arrrvalue] = useState([]);
  const [next,nextid] = useState("");
  const [nextresulr,nextresultvalue] = useState(false)
  const [data,dataval] = useState("");
  const [image,imageurl] = useState("")
  const [geans,geansvalue] = useState("")
  const [cate,category] = useState("")
  const [tv,tvvalue] = useState([])
  const BaseURL = "https://ill-pink-crow-tutu.cyclic.app/Add-Movie";
  const supabaseUrl = 'https://dcfuynjpxxdmsxwfacxq.supabase.co'
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjZnV5bmpweHhkbXN4d2ZhY3hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEzODQxNTUsImV4cCI6MjAwNjk2MDE1NX0.dhe2e-KtMcEkvEoJPn6SUNw_0vlKtI0NHxyxPfNEnJo";
  const supabase = createClient(supabaseUrl, supabaseKey)
  const uploadimage = async (url) => {
    if (url !== null && url !== "") {
      try {
        const response = await axios.post("https://api.imgbb.com/1/upload", null, {
          params: {
            key: "48df0216f838c0a3e9c746f61718472c",
            image: url,
          },
        });
        const imss = response.data.data.image.url;
        return imss;
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    }
  };
  function getdata(){
      if(nextresulr){
          return;
      }
      axios.get(`https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAr99xC5BUl1tpQX9LcM6ZcmOGLzFj-WdE&part=snippet&chart=mostPopular&maxResults=50&regionCode=IN${next}`)
      .then((data)=>{
          const dddaaatttaaa = data.data.items;
          nextid(`&pageToken=${data.data.nextPageToken}`);
          if(data.data.nextPageToken === undefined){
              nextresultvalue(true)
          }
          let arr = [];
          dddaaatttaaa.map((item)=>{
            if(item.snippet.thumbnails&&item.snippet.thumbnails.maxres&&item.snippet.thumbnails.maxres.url){
              arr.push(item);
            }
          })
          arrrvalue([...arrr,...arr]);
      })
  }
    function loadmoviesdata(){
      category("Movies")
      axios.get("https://vidsrc.me/movies/latest/page-1.json").then((data)=>{
        tvvalue(data.data.result);
      })
    }
    function loadtvdata(){
      category("TV")
      axios.get("https://vidsrc.me/tvshows/latest/page-1.json").then((data)=>{
        tvvalue(data.data.result);
      })
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      const form = e.target;
      const ImageURL = await uploadimage(form.Image.value);
      console.log(ImageURL);
      const formdata = `{"Title":"${form.Title.value}","Image":"${ImageURL}","MainCategory":"${form.MainCategory.value}","Geans":"${form.Geans.value}","FileID":"${form.FileID.value}","Plateform":"${form.Plateform.value}"},`
      let { data } = await supabase.from('Free-Netflix-Darabase').select('ID').order('ID', { ascending: false }).range(0,0)
      const count =  data[0].ID+1;
     await supabase
            .from('Free-Netflix-Darabase')
            .insert([
                {
                    "FileID": form.FileID.value,
                    "Title": form.Title.value,
                    "Image": ImageURL,
                    "Plateform": form.Plateform.value,
                    "Geans": form.Geans.value,
                    "MainCategory": form.MainCategory.value,
                    "ID":count
                },
            ])
      dataval(formdata);
      formRef.current.reset();
    }
    const AddSongstosite = async(data)=>{
      let da = await supabase.from('Free-Netflix-Darabase').select('ID').order('ID', { ascending: false }).range(0,0)
      const count =  da.data[0].ID+1;
      const objdata = {
        "FileID": data.id,
        "Title": data.snippet.title,
        "Image": data.snippet.thumbnails.maxres.url,
        "Plateform": "Youtube",
        "Geans": "Songs",
        "MainCategory": "Songs",
        "ID":count
      }
      await supabase
            .from('Free-Netflix-Darabase')
            .insert([objdata])
      alert("added ....")
    }
    const addvisstream = async(tit,img,id,main,gein,pla)=>{
      let da = await supabase.from('Free-Netflix-Darabase').select('ID').order('ID', { ascending: false }).range(0,0)
      const count =  da.data[0].ID+1;
      const ImageURL = await uploadimage(img);
      const objdata = {
        "FileID": id,
        "Title": tit,
        "Image": ImageURL,
        "Plateform": pla,
        "Geans": gein,
        "MainCategory": main,
        "ID":count
      }
      await supabase.from('Free-Netflix-Darabase').insert([objdata])
      imageurl("")
      geansvalue("")
      alert("added ....")
    }
    return (
      <>
      <Center><Heading color="red" m="50px">Free NetFlix</Heading></Center>
        <div style={{maxWidth:"500px",margin:"auto"}}>
      <form name="submit-to-google-sheet" onSubmit={handleSubmit} className="Form" ref={formRef}>
        <Textarea name="Title" type="text" placeholder="Title of Video ..." required m="10px" />
        <Input name="Image" type="text" placeholder="Image of Video ..." m="10px"  required />
        <Textarea name="FileID" type="text" placeholder="File ID..." m="10px"  required />
        <Select name="MainCategory" m="10px"  placeholder='Select MainCategory ...' required>
          <option value='Movies'>Movies</option>
          <option value='WebSeries'>Web Series</option>
          <option value='Adult'>Adult</option>
          <option value='Songs'>Songs</option>
        </Select>
        <Select name="Geans" m="10px"  placeholder='Select Geans ...' required>
          <option value='Romantic'>Romantic</option>
          <option value='Action'>Action</option>
          <option value='Adventure'>Adventure</option>
          <option value='Comedy'>Comedy</option>
          <option value='Crime'>Crime</option>
          <option value='Drama'>Drama</option>
          <option value='Horror'>Horror</option>
          <option value='Thriller'>Thriller</option>
          <option value='War'>War</option>
          <option value='Uncut'>Uncut</option>
          <option value='Ullu'>Ullu</option>
          <option value='Kooku'>Kooku</option>
          <option value='Fliz'>Fliz</option>
          <option value='Hotmasti'>Hotmasti</option>
          <option value='Primeflix'>Primeflix</option>
          <option value='MastiPrime'>MastiPrime</option>
          <option value='HotPrime'>HotPrime</option>
          <option value='WorldPrime'>WorldPrime</option>
        </Select>
        <Select name="Plateform" m="10px"  placeholder='Select Plateform ...' required>
          <option value='filemoon'>filemoon</option>
          <option value='Doodstream'>Doodstream</option>
          <option value='Youtube'>Youtube</option>
          <option value='vTube'>vTube</option>
          <option value='DailyMotion'>DailyMotion</option>
          <option value='streamtape'>streamtape</option>
          <option value='filelions'>filelions</option>
        </Select>
        <ButtonGroup style={{display:"flex",justifyContent:"space-between"}}>
           <Link href = "#" onClick={()=>{uploadimage(prompt("Image Url to upload"))}}><Button>Upload Image</Button></Link>
           <Button type="submit">Add to Site ... </Button>
        </ButtonGroup>
      </form>
      </div>
      <Textarea value={data} type="text" w="90vw" placeholder="Output..." required h="150px" ml="5vw" fontSize="10px" fontWeight="bolder"/>
      <CopyToClipboard text={data}>
        <Button color="red" border="1px solid red" m="-50px 0px 200px 80px">Copy to clipboard</Button>
      </CopyToClipboard>
      <div>
        <Button onClick={()=>{loadmoviesdata()}} color="red" border="1px solid red" m="-50px 0px 200px 80px">Add Movies</Button>
        <Button onClick={()=>{loadtvdata()}} color="red" border="1px solid red" m="-50px 0px 200px 80px">Add TV Shows</Button>
        {tv.length!==0?<>
        <table style={{width:"100%",textAlign:"center"}}>
          <thead>
          <tr>
            <td>ID</td>
            <td>Title</td>
            <td>Platform</td>
            <td>MainCateogry</td>
            <td>Geans</td>
            <td>Image</td>
            <td><Button>Add To Site</Button></td>
          </tr>
          </thead>
        <tbody>
        {tv.map((item)=>{
          return <tr key={item.imdb_id}>
            <td>{item.imdb_id}</td>
            <td><CopyToClipboard text={item.title}>
              <Button color="red" border="1px solid red">{item.title}</Button>
            </CopyToClipboard></td>
            <td>Vidsrc</td>
            <td>{cate}</td>
            <td><Select name="Geans" m="10px"  placeholder='Select Geans ...' onChange={(e)=>{geansvalue(e.target.value)}}>
          <option value='Romantic'>Romantic</option>
          <option value='Action'>Action</option>
          <option value='Adventure'>Adventure</option>
          <option value='Comedy'>Comedy</option>
          <option value='Crime'>Crime</option>
          <option value='Drama'>Drama</option>
          <option value='Horror'>Horror</option>
          <option value='Thriller'>Thriller</option>
          <option value='War'>War</option>
          <option value='Uncut'>Uncut</option>
          <option value='Ullu'>Ullu</option>
          <option value='Kooku'>Kooku</option>
          <option value='Fliz'>Fliz</option>
          <option value='Hotmasti'>Hotmasti</option>
          <option value='Primeflix'>Primeflix</option>
          <option value='MastiPrime'>MastiPrime</option>
          <option value='HotPrime'>HotPrime</option>
          <option value='WorldPrime'>WorldPrime</option>
            </Select></td>
            <td><Input type="text" placeholder="Image of Video ..." m="10px"onChange={(e)=>{imageurl(e.target.value)}} /></td>
            <td><Button onClick={()=>{addvisstream(item.title,image,item.imdb_id,cate,geans,"vidsrc")}}>Add</Button></td>
          </tr>
        })}
        </tbody>
        </table>
        </>:<></>}
      </div>
      {arrr.length === 0?<></>:<>
      <div style={{display:"grid", gap:"5px",gridTemplateColumns:"repeat(5, minmax(0, 1fr))"}}>
      {arrr.map((item)=>{
        return <div key={item.id} style={{border:"1px solid red",margin:"10px",borderRadius:"5px"}}>
          <img src={item.snippet.thumbnails.maxres.url} alt="" />
          <Button onClick={()=>{AddSongstosite(item)}}>Add To Site</Button>
        </div>
      })}
      </div>
      </>}
       <Button onClick={()=>{getdata()}}>Load Data To Add</Button>
      </>
    );
  }

