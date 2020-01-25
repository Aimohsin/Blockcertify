import React, {Component} from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode.react';
import fbConfig from './config/Firebase';
import moment from 'moment';

const downloadQR = () => {
  const canvas = document.getElementById("123456");
  const pngUrl = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  let downloadLink = document.createElement("a");
  downloadLink.href = pngUrl;
  downloadLink.download = "123456.png";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

export class IssueCertificate extends Component {
  state= {
    name:'',
    f_name:'',
    id_no:'',
    enroll_no:'',
    department:'',
    dateOfDegreeissue:'',
    cert:false
  }
  constructor(props){
    super(props);
    this.ref = fbConfig.firestore().collection('boards');
    this.state = {
      name:'',
    f_name:'',
    id_no:'',
    enroll_no:'',
    department:'',
    dateOfDegreeissue:''
    }
  }
  printDocument() {
    const input = document.getElementById('FormtoPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('landscape');
        pdf.addImage(imgData, 'JPEG', -40, 50);
        // pdf.output('dataurlnewwindow');
        pdf.save("degree.pdf");
      })
    ;
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { name, f_name, id_no, enroll_no, department, dateOfDegreeissue } = this.state;
    this.ref.add({
      name,
      f_name,
      id_no,
      enroll_no,
      department,
      dateOfDegreeissue
    }).then((docRef) => {
      this.setState({
        name: '',
        f_name: '',
        id_no: '',
        enroll_no: '',
        department: '',
        dateOfDegreeissue: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  onChange =(e)=>this.setState({[e.target.id]:e.target.value})

  clear = (e)=>{
    e.preventDefault()
    this.setState({ name:'', f_name:'', id_no:'', enroll_no:'', department:'', dateOfDegreeissue:''})
  }

  autoFill = (e)=>{
    e.preventDefault()
    const autoFill ={
      name:'Ali', f_name:'M. Khan', id_no:'EP1650021', enroll_no:'DCS/UBIT', department:'Computer Science', dateOfDegreeissue:moment().format('MMMM Do YYYY'),
    }
    this.setState(autoFill)
  }

  render() {
    //const { name, f_name, id_no, enroll_no, department, dateOfDegreeissue } = this.state;
    return (
      <div>
        <h3 style={{color:'white'}}>Issue Certificate</h3>
       {
           this.state.cert ? 
        <form style={{backgroundColor:'#fff',width:'40%',borderRadius:10,padding:10}} className="mdl-shadow--2dp" action="/3" method="post">
            <div style={{display:'flex',justifyContent:'center',padding:5}}>
                <div style={{flex:1,textAlign:'left'}}>Student Name</div>
                <input name="name" style={{flex:1}}  className="mdl-textfield__input" value={this.state.name} id="name" onChange={(e)=>this.onChange(e)} />
            </div>
            <div style={{display:'flex',justifyContent:'center',padding:5}}>
                <div style={{flex:1,textAlign:'left'}}>Father's Name</div>
                <input name="f_name" style={{flex:1}}  className="mdl-textfield__input" value={this.state.f_name} id="f_name" onChange={(e)=>this.onChange(e)} />
            </div>
            <div style={{display:'flex',justifyContent:'center',padding:5}}>
                <div style={{flex:1,textAlign:'left'}}>ID Number</div>
                <input name="id_no" style={{flex:1}}  className="mdl-textfield__input" value={this.state.id_no} id="id_no" onChange={(e)=>this.onChange(e)} />
            </div>
            <div style={{display:'flex',justifyContent:'center',padding:5}}>
                <div style={{flex:1,textAlign:'left'}}>Enrollnment Number</div>
                <input name="enroll_no" style={{flex:1}}  className="mdl-textfield__input" value={this.state.enroll_no} id="enroll_no" onChange={(e)=>this.onChange(e)} />
            </div>
            <div style={{display:'flex',justifyContent:'center',padding:5}}>
                <div style={{flex:1,textAlign:'left'}}>Department</div>
                <input name="department" style={{flex:1}}  className="mdl-textfield__input" value={this.state.department} id="department" onChange={(e)=>this.onChange(e)} />
            </div>
            <div style={{display:'flex',justifyContent:'center',padding:5}}>
                <div style={{flex:1,textAlign:'left'}}>Date of Issue Degree </div>
                <input name="dateOfDegreeIssue" style={{flex:1}}  className="mdl-textfield__input" value={this.state.dateOfDegreeissue} id="dateOfDegreeissue" onChange={(e)=>this.onChange(e)} />
            </div>
       </form>
       :
       <div id="FormtoPrint">
       <div style={{backgroundColor:'#fff',width:'70%',border:'2px solid green',borderRadius:10,padding:5}} className="mdl-shadow--2dp">
         <div style={{backgroundColor:'#fff',border:'1px solid green',borderRadius:10,padding:10}}>
            <div style={{display:'flex'}}>
            <img src="./KUlogo.jpg" style={{width: 140, height: 100, borderRadius: '50%'}} alt="KU" />
            <div style={{flex:1,color:'red',flexDirection:'column', fontSize:30, marginTop:15}}>
              <u>University of Karachi</u>
              <div style={{color:'black',fontSize:35,marginTop:30}}>DEGREE VERIFIED CERTIFICATE</div>
            </div>
            </div>
            <div style={{display:'flex',marginTop:10,flexDirection:'column',textAlign:'left'}}>
            <p style={{fontWeight:700 }}>This is to certify that <u>Mr {this.state.name === ''  ? ' Ali' : this.state.name }</u> (S/O, D/O) <u> Mr. {this.state.f_name=== ''? 'M. Khan': this.state.f_name}</u> is a student of {this.state.department ==='' ?  'Computer Science' : this.state.department} , University of Karachi with the ID number {this.state.id_no ==='' ? 'EP1650021' : this.state.id_no} and Enrollnment number {this.state.enroll_no ==='' ? '' : this.state.enroll_no}.
            Hence his/her degree is verified.</p>
            </div>
            <div style={{display:'flex',marginTop:10,flexDirection:'row',textAlign:'left'}}>
              <div style={{display:'flex',marginTop:10,flexDirection:'column',textAlign:'left'}}>
                <u style={{margin:5,fontWeight:700}}>Date OF ISSUE: {moment().format('MMMM Do YYYY')}</u>
                <u style={{margin:5,fontWeight:700}}>SIGNING AUTHORITY:</u>
                <h6 style={{color:'white'}}>Sign Here</h6>
              </div>
              <div style={{display:'flex',flex:1,justifyContent:'flex-end',alignItems:'center'}}>
              <div style={{Width:80,height:80}} onClick={downloadQR}>
            <QRCode
              id={this.state.id_no}
              value={this.state.name + this.state.enroll_no + this.state.id_no + this.state.department}
              size={100}
              level={"H"}
              includeMargin={true}
            />
          </div>
              </div>
            </div>
          </div>
       </div>
       </div>
       }
       {
        this.state.cert ?
          <div>
         <button className="mdl-button mdl-js-button" style={{backgroundColor:'RGB(0,153,153)',color:'#fff',margin:10}}
          onClick={()=>this.setState({cert:false})}>
          ISSUE CERTIFICATE 
          </button>
              <button className="mdl-button mdl-js-button" style={{backgroundColor:'RGB(0,153,153)',color:'#fff',margin:10}}
          onClick={(e)=>this.autoFill(e)}>
          Auto Fill 
          </button>
              <button className="mdl-button mdl-js-button" style={{backgroundColor:'RGB(0,153,153)',color:'#fff',margin:10}}
          onClick={(e)=>this.clear(e)}>
         Clear 
          </button>
          </div>
          :
          <div>
         <button className="mdl-button mdl-js-button" style={{backgroundColor:'RGB(0,153,153)',color:'#fff',margin:10}}
          onClick={(e)=>this.onSubmit(e)}>
          Submit 
          </button>
              <button className="mdl-button mdl-js-button" style={{backgroundColor:'RGB(0,153,153)',color:'#fff',margin:10}}
          onClick="submitform()">
          Make Block
          </button>
              <button className="mdl-button mdl-js-button" style={{backgroundColor:'RGB(0,153,153)',color:'#fff',margin:10}}
          onClick={(e)=>this.setState({cert:true})}>
         Edit
          </button>
          <button className="mdl-button mdl-js-button" style={{backgroundColor:'RGB(0,153,153)',color:'#fff',margin:10}}
          onClick={this.printDocument}>
          Download 
          </button>
          </div>
       }
      </div>
    )
  }
              //var hash = {md5(this.state.name + this.state.enroll_no + this.state.id_no + this.state.department)}
}

export default IssueCertificate
