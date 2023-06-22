import React, {useState} from 'react';
import {Button, Dialog, DialogContent, Grid, Typography,} from "@mui/material";

const PostItem = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [like, setLike] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleLike = () => {
        setLike(!like);
    }


    return (
        <Grid container spacing={2} sx={{
            width: '600px',
            border: '1px solid #ccc',
            borderRadius: '15px',
            padding: '10px',
            marginBottom: '30px'
        }}>
            <Grid item xs={2}>
                <img
                    src={props.profile_image}
                    alt='profilePic'
                    style={{borderRadius: '50%', height: '50px', width: '55px'}}
                />
            </Grid>
            <Grid item xs={10}>
                <Grid container direction="row">
                    <Typography variant="h6" component="h4" sx={{marginRight: '15px'}}>
                        {props.name}
                    </Typography>
                    <Typography variant="p" component="p" sx={{marginTop: '10px', color: '#999', marginRight: '15px'}}>
                        {props.username}
                    </Typography>
                    <Typography variant="p" component="p" sx={{marginTop: '10px', marginRight: '15px'}}>
                        {props.date}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="p" component="p" sx={{marginBottom: '20px'}}>
                    {props.caption}
                </Typography>
                <img
                    src={props.image}
                    alt='postImg'
                    style={{borderRadius: '15px', height: 'auto', maxWidth: '400px'}}
                    onClick={handleOpenModal}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="p" component="p"
                            sx={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}>
                    <Button onClick={handleLike} variant="contained"
                            sx={{backgroundColor: '#3498db', color: '#fff', borderRadius: '5px', marginRight: '10px'}}>
                        Like🤙
                    </Button>
                    <Typography variant="p" component="p" sx={{color: '#999'}}>
                        {like && 'you and'} {props.likes} people like this
                    </Typography>
                </Typography>
            </Grid>

            <Dialog open={isModalOpen} onClose={handleCloseModal}>
                <DialogContent>
                    <img src={props.image} alt='postImg' style={{width: '100%', height: 'auto'}}/>
                </DialogContent>
            </Dialog>
        </Grid>
    );
};

export default PostItem;