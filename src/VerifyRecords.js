import React, { Component } from 'react';
import firebase from 'firebase';
import fbConfig from './config/Firebase';

export class VerifiRecords extends Component {
  state= {
    name:'',
    f_name:'',
    id_no:'',
    enroll_no:'',
    department:'',
    dateofDegreeIssue:'',
    cert:true
  }
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('boards');
    this.unsubscribe = null;
    this.state = {
      boards: []
    };
  }
  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const { name, f_name, id_no, enroll_no, department, dateofDegreeIssue } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        f_name,
        id_no,
        enroll_no,
        department,
        dateofDegreeIssue
      });
    });
    this.setState({
      boards
   });
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
      
  onChange =(e)=>this.setState({[e.target.id]:e.target.value})

  ver() {
    const searchform = document.querySelector("#add-cafe")

     searchform.addEventListener('submit',(e)=>{
        const txt = document.getElementById('doi').value;
        e.preventDefault();
         alert(txt)
         const db = fbConfig.firestore();
         db.collection('boards').where('id_no','==',txt).onSnapshot(snapshot=>{
            let changes =snapshot.docChanges();
            changes.map(mydata=>{
                console.log(mydata.doc)
                return mydata.doc
            })
        })
        })
  }

  render() {
    return (
      <div className="verBody">
         <h3 style={{color:'#fff'}}>VERIFY DEGREE</h3> 
         <h5 style={{color:'#fff'}}>Please perform any one operation to check Degree</h5> 
         <h6 style={{color:'red', fontSize:'12px'}}>(Hash number must be 16 digits numbers.)</h6>
         
         <form id="add-cafe" style={{backgroundColor:'#fff',width:'40%',borderRadius:10,padding:10}} className="mdl-shadow--2dp">
            <div style={{display:'flex',justifyContent:'center',padding:5}}>
                <div style={{flex:1,textAlign:'left'}}>ENTER HASH NUMBER</div>
                <input name='SEnroll' type="Enroll" style={{flex:1}} className="mdl-textfield__input"  id="doi" onChange={(e)=>this.onChange(e)} />
            </div>
        </form>
            <button id="add" className="mdl-button mdl-js-button" style={{backgroundColor:'RGB(0,153,153)',color:'#fff',margin:10}}
            onClick={this.ver}>
            DONE
            </button>
      </div>
    )
  }
}

export default VerifiRecords
