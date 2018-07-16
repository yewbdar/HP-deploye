import React, { Component } from "react";
import { Document, Page } from 'react-pdf';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

class uploadFile extends Component {
    constructor(){
        super();
        this.state = {
            numPages: null,
            pageNumber: 1,
        }
    }


    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };

    render() {
        const { pageNumber, numPages } = this.state;

        return (
            <div className="content">
                           <div className="row" >
                                <div className="col-lg-12" style={{maxHeight : "2rem"}}>
                                    <input  type="file" name="file" id="file" class="custom-file-input"  onChange={this.props.onChange}  />
                                    <label for="file" class="custom-file-label"> Resume </label>
                                </div>
                           </div>
                           <div className="row">

                               <div className="col-lg-12" style={{  maxHeight : "10rem" ,
                                                                    overflowY : "scroll" ,
                                                                    border:"1px solid #C0C0C0",
                                                                    borderRadius:"5px",
                                                                    marginTop : "1rem"
                                                                }}>
                                   Preview
                                   <hr />
                                    <Document
                                        file={this.props.file}
                                        onLoadSuccess={this.onDocumentLoadSuccess}
                                    >
                                        <Page pageNumber={pageNumber} />
                                    </Document>
                                    <div className="mx-auto" style={{width : "10rem"}}> Page {pageNumber} of {numPages ? numPages : "-" }</div>
                           </div>
                           </div>
                           <div className="row" >
                               <div className="col-lg-12 col-md-12 col-sm-12 " >

                                   <TextField
                                        id="yearsOfExperience"
                                        label="Years Of Experience "
                                        value={this.props.yearsOfExperience}
                                        onChange={this.props.handleChange}
                                        margin="normal"
                                        name="yearsOfExperience"
                                        fullWidth
                                    />
                                </div>
                            </div>

                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 " >
                            <InputLabel >qualification</InputLabel>
                            <FormControl fullWidth >
                                <Select
                                    multiple
                                    value={this.props.selectedQualifications}
                                    onChange={this.props.handleQualificationChange}
                                    input={<Input id="select-multiple-checkbox" />}
                                    renderValue={selected => this.props.handleSelectedQualifications(selected)}
                                >
                                    {this.props.qualifications.map(qualification => (

                                        <MenuItem key={qualification["_id"]} value={qualification["_id"]}>
                                            <Checkbox checked={this.props.selectedQualifications.indexOf(qualification["_id"]) > -1} />

                                            <ListItemText primary={qualification.name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
            </div>
        );
    }
}


export default uploadFile;