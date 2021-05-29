import React, { Component } from 'react'
import './App.css';
import { Table } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import PageItem from 'react-bootstrap/PageItem'

// const columns =["Customer Name","Email","Phone","Premium","Max/Min bid"];
class TableBox extends Component {
        

    constructor(props) {
        super(props)
        this.state = {
          users: [],
          custom_header:[{"Customer Name":"","Email":"","Phone":"","Premium":"","Max/Min bid":""}],
          isLoading: false,
          isError: false,
          show:true
          
        }

        
        

        // this.users = this.users.bind(this);
        // this.generateHeader = this.generateHeader.bind(this);
        // this.generateTableData = this.generateTableData.bind(this);
      }
      
    //   Async function get request

      async componentDidMount() {
        this.setState({ isLoading: true })
        const response = await fetch('https://intense-tor-76305.herokuapp.com/merchants')
        if (response.ok) {
          const users = await response.json()
          console.log(users)
          this.setState({ users, isLoading: false })
        } else {
          this.setState({ isError: true, isLoading: false })
        }
      }

      renderTableHeader = () => {
        return Object.keys(this.state.custom_header[0]).map(attr => <th key={attr}>{attr.toUpperCase()}</th>)
      }

      renderTableRows = () => {
        return this.state.users.map(user => {
            let premium;
            let maxBid;
            let minBid;
            if (user.hasPremium === true){ 
                premium = 'Yes'}
                if (user.hasPremium === false){
                    premium = 'No'
                }
            if(user.bids){
                this.state.show ?
                maxBid = Math.max.apply(Math, user.bids.map(function(o) { return o.amount; }))
                :
                minBid = Math.min.apply(Math, user.bids.map(function(o) { return o.amount; }))
            }
          return (
            <tr key={user.id}>
              <td className="td"><img className="avtar"  src={user.avatarUrl}/><div><span className="username">{user.firstname}</span> <span>{user.lastname}</span> </div></td>
              {/* <td>{user.lastname}</td> */}
              {/* <td>{user.avatarUrl}</td> */}
              <td className="td-1 text-center">{user.email}</td>
              <td className="td-1 text-center">{user.phone}</td>
              <td className="td-1 text-center">{premium}</td>
              <td className="td-1 text-center">
                  <span id='max'>{maxBid}</span><span id='min'>{minBid}</span> 
                  <label class="switch">
                      <input onClick={() =>{this.setState({show:!this.state.show})}} type="checkbox" id="togBtn" />
                          <div class="slider round"></div>
                          </label>
              </td>
              
              
              
            </tr>
          )
        })
      }
    
    // generateHeader(){
    //     let res=[];
    //   for(var i =0; i < columns.length; i++){
    //       res.push(<th key={columns[i]}>{columns[i]}</th>)
    //   }
    //   return res;
    // }
    // generateTableData(){
    //     let res=[];
    //     let tableData = this.users.data;
    //     for(var i =0; i < tableData.length; i++){
    //         res.push(
    //          <tr >
    //         <td key={tableData[i].firstname}>{tableData[i].id}{tableData[i].lastName}</td>
    //         <td key={tableData[i].email}>{tableData[i].email}</td>
    //         <td key={tableData[i].phone}>{tableData[i].phone}</td>
    //         <td key= {tableData[i].hasPremium}>{tableData[i].hasPremium}</td>
    //         </tr>
    //         )
    //     }
    //     return res;
    // }

    render(){
        const { users, isLoading, isError } = this.state

    if (isLoading) {
      return <div>Loading...</div>
    }

    if (isError) {
      return <div>Error</div>
    }
    return users.length > 0
    ? (
    //     <MDBTable bordered hover>
    //   <MDBTableHead color="primary-color">
    //     <tr>
    //         <th>
    //     {this.renderTableHeader()}
    //     </th>
    //     </tr>
    //   </MDBTableHead>
    //   <MDBTableBody>
    //     <tr>
    //     {this.renderTableRows()}
    //     </tr>
    //   </MDBTableBody>
    // </MDBTable>
               

      <Table striped bordered hover variant="dark">
        <thead>
          <tr className="tr">
            {this.renderTableHeader()}
          </tr>
        </thead>
        <tbody>
          {this.renderTableRows()}
        </tbody>
        <Pagination size='2'>
  <Pagination.First />
  <Pagination.Prev />
  <Pagination.Item>{1}</Pagination.Item>
  <Pagination.Ellipsis />
  <Pagination.Next />
  <Pagination.Last />
</Pagination>
      </Table>
    ) : (
      <div>
        No users.
    </div>
    )
    }
  }

export default TableBox;

