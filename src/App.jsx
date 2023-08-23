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
  const [tv,tvvalue] = useState([])
  const [movies,moviesvalue] = useState([])
  const BaseURL = "https://ill-pink-crow-tutu.cyclic.app/Add-Movie";
  const supabaseUrl = 'https://dcfuynjpxxdmsxwfacxq.supabase.co'
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjZnV5bmpweHhkbXN4d2ZhY3hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEzODQxNTUsImV4cCI6MjAwNjk2MDE1NX0.dhe2e-KtMcEkvEoJPn6SUNw_0vlKtI0NHxyxPfNEnJo";
  const supabase = createClient(supabaseUrl, supabaseKey)
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
      axios.get("https://vidsrc.to/vapi/movie/new/1").then((data)=>{
        console.log(data.result.items);
      })
    }
    function loadtvdata(){
      axios.get("https://vidsrc.to/vapi/tv/new/1").then((data)=>{
        console.log(data.result.items);
      })
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      const form = e.target;
      const formdata = `{"Title":"${form.Title.value}","Image":"${form.Image.value}","MainCategory":"${form.MainCategory.value}","Geans":"${form.Geans.value}","FileID":"${form.FileID.value}","Plateform":"${form.Plateform.value}"},`
      const jsonData = `{"Title":"${form.Title.value}","Image":"${form.Image.value}","MainCategory":"${form.MainCategory.value}","Geans":"${form.Geans.value}","FileID":"${form.FileID.value}","Plateform":"${form.Plateform.value}"}`
      await axios.post(BaseURL, jsonData)
      .then(response => {
        alert("POST request successful!", response.data);
      })
      .catch(error => {
        console.error("Error occurred during POST request:", error);
      });
      let { data } = await supabase.from('Free-Netflix-Darabase').select('ID').order('ID', { ascending: false }).range(0,0)
      const count =  data[0].ID+1;
     await supabase
            .from('Free-Netflix-Darabase')
            .insert([
                {
                    "FileID": form.FileID.value,
                    "Title": form.Title.value,
                    "Image": form.Image.value,
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
           <Link href = "https://ill-pink-crow-tutu.cyclic.app/Add-Movie" isExternal><Button>Check</Button></Link>
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

