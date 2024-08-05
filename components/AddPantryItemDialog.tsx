"use client";

import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material';
import {PantryItem} from "@/app/lib/models";
import {uuidv4} from "@firebase/util";

interface Props {
    isOpen: boolean;
    handleClose: () => void;
    onSubmit: (data: PantryItem) => void
}

const AddPantryItemDialog = ({isOpen, handleClose, onSubmit}: Props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullScreen={fullScreen}
            fullWidth={true}
            PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries((formData as any).entries());

                    onSubmit({
                        id: uuidv4(),
                        name: formJson.name,
                        price: formJson.price,
                        quantity: formJson.quantity
                    });
                    handleClose();
                },
            }}
        >
            <DialogTitle id="alert-dialog-title">
                {"New Pantry Item"}
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="quantity"
                    name="quantity"
                    label="Quantity"
                    type="number"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="price"
                    name="price"
                    label="Price"
                    type="number"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button type={"submit"} variant={"contained"}>Submit</Button>
                <Button onClick={() => handleClose()}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddPantryItemDialog;