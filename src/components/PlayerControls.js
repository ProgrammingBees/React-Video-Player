import { Button, Grid, IconButton, Popover, Slider, Tooltip, Typography } from "@material-ui/core";
import { makeStyles, styled } from "@material-ui/core/styles";
import { Bookmark, FastForward, FastRewind, Fullscreen, Pause, PlayArrow, VolumeOff, VolumeUp } from "@material-ui/icons";
import React, { forwardRef } from 'react';


const useStyles = makeStyles({
        controlsWrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: 1,
        },
    
        controlIcons: {
        color: "#777",
        fontSize: 50,
        transform: "scale(0.9)",
        "&:hover": {
            color: "#fff",
            transform: "scale(1)",
        },
        },
        bottomIcons: {
        color: "#999",
        "&:hover":{
            color: "#fff",
        },
        },
        volumeSlider: {
        width: "100px",
        display: "inline"
        },
    });
    
    function ValueLabelComponent(props) {
        const { children, value } = props;
    
        return (
        <Tooltip enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
        );
    }
    
    const AirbnbSlider = styled(Slider)(({ theme }) => ({
        height: 3,
        padding: '13px 0',
        '& .MuiSlider-thumb': {
        height: 27,
        width: 27,
        marginTop: "-12px",
        backgroundColor: '#fff',
        border: '1px solid currentColor',
        '&:hover': {
            boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
        },
        '& .airbnb-bar': {
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
        },
        '& .MuiSlider-track': {
        height: 3,
        },
        '& .MuiSlider-rail': {
        color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
        opacity: theme.palette.mode === 'dark' ? undefined : 1,
        height: 3,
        },
    }));

export default forwardRef(({onPlayPause,playing, onRewind,handleFastForward,onMute,muted, onVolumeSeekUp,onVolumeChange,volume,onPlaybackRateChange,playbackRate,onToggleFullScreen,played,onSeekMouseDown,onSeek,onSeekMouseUp,elapsedTime,totalDuration,onChangeDisplayFormat,onBookmark},ref) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopover = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        };

    const open = Boolean(anchorEl);
    const id = open ? 'playbackrate-popover' : undefined;
        return (
            <>
            {/* Top Controls */}
            <div className={classes.controlsWrapper} ref={ref}>
                    <Grid container direction="row" alignItems="center" justifyContent="space-between" style={{padding: 16}}>
                        <Grid item>
                        <Typography variant="h5" style={{color: "#fff"}}>ElephantsDream.mp4</Typography>
                        </Grid>
                        <Grid item>
                        <Button onClick={onBookmark} variant="contained" color="primary"
                        startIcon={<Bookmark/>}
                        >Bookmark</Button>
                        </Grid>
                    </Grid>

                    {/* Middle Controls */}

                    <Grid container direction="row" alignItems="center" justifyContent="center">

                        <IconButton
                        className={classes.controlIcons}
                        onClick={onRewind}
                        aria-label="reqind"
                        >
                        <FastRewind fontSize="inherit"/>
                        </IconButton>

                        <IconButton
                        className={classes.controlIcons}
                        onClick={onPlayPause}
                        aria-label="reqind"
                        >
                        {playing ? <Pause fontSize="inherit"/> : <PlayArrow fontSize="inherit"/>}
                        </IconButton>
                        
                        <IconButton
                        className={classes.controlIcons}
                        aria-label="reqind"
                        onClick={handleFastForward}
                        >
                        <FastForward fontSize="inherit"/>
                        </IconButton>
                    </Grid>

                    {/* Bottom Controls */}
                    <Grid container direction="row" alignItems="center" justifyContent="space-between"
                    style={{padding: 16}}
                    >
                        <Grid item xs={12}>
                            <AirbnbSlider min={0} max={100} value={played * 100} ValueLabelComponent ={(props) => <ValueLabelComponent {...props} value={elapsedTime}/>}
                            onChange={onSeek}
                            onMouseDown={onSeekMouseDown}
                            onChangeCommitted={onSeekMouseUp}
                            />
                        </Grid>

                        <Grid item>
                            <Grid container alignItems="center" direction="row">
                            <IconButton onClick={onPlayPause} className={classes.bottomIcons}>
                            {playing ? <Pause fontSize="large"/> : <PlayArrow fontSize="large"/>}
                                
                            </IconButton>

                            <IconButton className={classes.bottomIcons} onClick={onMute}>
                                {muted ? <VolumeOff fontSize="large"/> :<VolumeUp fontSize="large"/>}
                            </IconButton>

                            <Slider min={0} max={100} onChange={onVolumeChange} onChangeCommitted={onVolumeSeekUp} 
                            value = {volume * 100} className={classes.volumeSlider}/>

                            <Button onClick={onChangeDisplayFormat} variant="text" style={{color: "#fff", marginLeft: 16,}}>
                                <Typography>{elapsedTime}/{totalDuration}</Typography>
                            </Button>
                            </Grid>
                        </Grid>
                        
                            <Grid item>
                            <Button onClick={handlePopover} variant="text" className={classes.bottomIcons}>
                                <Typography>{playbackRate}x</Typography>
                            </Button>

                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                                }}
                                transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                                }}
                            >
                                <Grid container direction="column-reverse">
                                {[0.5,1.0,1.5,2.0,2.5].map(rate => (
                                    <Button onClick={()=> onPlaybackRateChange(rate)} variant="text">
                                    <Typography  color={rate=== playbackRate ? "secondary":"default"}>{rate}</Typography>
                                    </Button>
                                ))}
                                </Grid>
                            </Popover>

                            <IconButton onClick={onToggleFullScreen} className={classes.bottomIcons}>
                                <Fullscreen fontSize="large"/>
                            </IconButton>
                            </Grid>
                    </Grid>

                </div>
        </>
    )
});
