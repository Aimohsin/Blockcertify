import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Firebase from 'firebase';

export class ViewRecords extends Component {
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
        this.ref = Firebase.firestore().collection('boards');
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
    
      render() {
          return(
            <div class="container">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 style={{color: '#fff'}} class="panel-title">
                  RECORDS
                </h3>
              </div>
              <form style={{backgroundColor:'#fff',width:'60%',borderRadius:10,padding:10}} className="mdl-shadow--2dp">
              <div class="panel-body">
                <table class="table table-stripe">
                  <thead>
                    <tr>
                    <th>ID no</th>
                      <th>Name</th>
                      <th>Father's Name</th>
                      <th>Enrollnment no</th>
                      <th>Department</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.boards.map(board =>
                      <tr>
                        <td style={{color:'black'}}><Link to={`//${board.key}`}>{board.id_no}</Link></td>
                        <td>{board.name}</td>
                        <td>{board.f_name}</td>
                        <td>{board.enroll_no}</td>
                        <td>{board.department}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              </form>
            </div>
          </div>
          );
      }
    }

    export default ViewRecords