import React from 'react'
import ContentAdd from "material-ui/svg-icons/content/add"
import FloatingActionButton from "material-ui/FloatingActionButton"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import TextField from "material-ui/TextField"
import { fetchWithToken, apiURL } from 'assets/utils/request'
import './dialog.less'

import withSnackbar from 'hoc/snackbar';

@withSnackbar
export default class InputDialog extends React.Component {
    state = {
        dialogOpen: false
    }

    handleOpen = () => {
        this.setState({
            dialogOpen: true
        })
    }

    handleClose = () => {
        this.setState({
            dialogOpen: false
        })
    }

    handleSend = () => {
        const { openSnackbar, fetchData } = this.props,
            that = this

        const doc = document,
            server_name = doc.getElementById('server_name').value,
            ip = doc.getElementById('ip').value,
            port = doc.getElementById('port').value,
            password = doc.getElementById('password').value,
            region = doc.getElementById('region').value,
            encrypt_method = doc.getElementById('encrypt_method').value;

        const params = { server_name, ip, port, password, region, encrypt_method }
        fetchWithToken(apiURL.Add_ss, params, 'POST')
            .then(res => res.json())
            .then(res => {
                if (res.error_code == 0) {
                    fetchData()
                    that.handleClose()
                    openSnackbar('添加成功!')
                } else {
                    console.log(res)
                    openSnackbar('添加失败,输入信息不正确')
                }
            })
            .catch(error => {
                 console.log(err)
            })


    }

    render() {
        return (
            <div>
                <FloatingActionButton secondary={true} className="floating-button" onTouchTap={this.handleOpen}>
                    <ContentAdd />
                </FloatingActionButton>

                <Dialog
                    autoScrollBodyContent={true}
                    actions={[
                        <FlatButton
                            label="Cancel"
                            primary={true}
                            onTouchTap={this.handleClose}
                        />,
                        <FlatButton
                            label="Send"
                            primary={true}
                            keyboardFocused={true}
                            onTouchTap={this.handleSend}
                        />,
                    ]}
                    modal={false}
                    open={this.state.dialogOpen}
                    onRequestClose={this.handleClose}
                    style={{ overflow: 'scroll' }}
                >
                    <div>
                        <TextField style={{ width: '100%' }}
                            floatingLabelText="server name"
                            multiLine={true}
                            rows={1}
                            id="server_name"
                        />
                        <TextField style={{ width: '100%' }}
                            floatingLabelText="ip"
                            multiLine={true}
                            rows={1}
                            id="ip"
                        />
                        <TextField style={{ width: '100%' }}
                            floatingLabelText="port"
                            multiLine={true}
                            rows={1}
                            id="port"
                        />
                        <TextField style={{ width: '100%' }}
                            floatingLabelText="password"
                            multiLine={true}
                            rows={1}
                            id="password"
                        />
                        <TextField style={{ width: '100%' }}
                            floatingLabelText="region"
                            multiLine={true}
                            rows={1}
                            id="region"
                        />
                        <TextField style={{ width: '100%' }}
                            floatingLabelText="encrypt method"
                            multiLine={true}
                            rows={1}
                            id="encrypt_method"
                        />
                    </div>

                </Dialog>
            </div>

        )
    }
}