
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const SnackBar = React.memo((props) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={ props.open }
            autoHideDuration={ 3000 }
            onClose={ props.onClose }
            >
            <MuiAlert
                elevation={6} 
                variant="filled"
                onClose={ props.onClose } 
                severity={ props.severity }
                >
                { props.message }
            </MuiAlert>
        </Snackbar>
    );
})

export default SnackBar;