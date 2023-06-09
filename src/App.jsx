import { Input , Button , Select , Textarea , ButtonGroup , Link , Center , Heading} from "@chakra-ui/react";
import { useRef } from "react"
import { useState , useEffect } from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import axios from 'axios';
export default function MyForm() {
  const formRef = useRef(null);
  const [data,dataval] = useState("");
    const handleSubmit = (e) => {
      e.preventDefault();
      const form = e.target;
      const formdata = `{"Title":"${form.Title.value}","Image":"${form.Image.value}","MainCategory":"${form.MainCategory.value}","Geans":"${form.Geans.value}","FileID":"${form.FileID.value}","Plateform":"${form.Plateform.value}"},`
        dataval(formdata);
          formRef.current.reset();
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
           <Link href = "https://netflix-api-for-project.onrender.com/" isExternal><Button>Check</Button></Link>
           <Button type="submit">Add to Site ... </Button>
        </ButtonGroup>
      </form>
      </div>
      <Textarea value={data} type="text" w="90vw" placeholder="Output..." required h="150px" ml="5vw" fontSize="10px" fontWeight="bolder"/>
      <CopyToClipboard text={data}>
        <Button color="red" border="1px solid red" m="-50px 0px 200px 80px">Copy to clipboard</Button>
      </CopyToClipboard>
      </>
    );
  }

