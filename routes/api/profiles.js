const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const validateProfileInput = require('../../validation/profiles');  
const Profile = require('../../models/Profile');
const User = require('../../models/Users');
// Test route
router.get('/test', (req, res) => {
    res.json({ msg: "profiles works" });
});


//public route to get all profiles
router.get('/all',(req,res)=>{
    const errors ={};
    Profile.find()
        .populate('user', ['name','avatar'])
            .then(profiles=>{
                if(!profiles){
                    errors.noprofile = 'there is no profiles';
                    res.status(404).json(errors);
                }
                res.json(profiles);

            }).catch(err => res.json({profile: 'there is no profile with this id'}));
})

//public route to get profiles by handle
router.get('/handle/:handle',(req,res)=>{
    const errors ={};
    Profile.findOne({handle: req.params.handle})
        .populate('user', ['name','avatar'])
        .then(profiles =>{
            if(!profiles){
                errors.noprofile = 'there is no profile for this user';
                res.status(404).json(errors);
            }
            res.json(profiles);
        }).catch(err => res.json(err));
});

//public route to profiles by Id
router.get('/user/:user_id',(req,res)=>{
    const errors ={};
    Profile.findOne({user: req.params.user_id})
        .populate('user', ['name','avatar'])
        .then(profiles =>{
            if(!profiles){
                errors.noprofile = 'there is no profile for this user';
                res.status(404).json(errors);
            }
            res.json(profiles);
        }).catch(err => res.json({profile: 'there is no profile with this id'}));
});

// protected route to get profiles
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
        .populate('user', ['name','avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'there is no profile with this user';
                return res.status(404).json({ errors })
            }
            res.json(profile);

        }).catch(err => res.status(404).json(err))
});

//protected route to create or edit profiles
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const {errors, isValid} = validateProfileInput(req.body);
    if(!isValid){
       return res.status(400).json(errors);
    }
    //get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    // skills split into array
    if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }
    //socials
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    Profile.findOne({ user: req.user.id }, )
        .then(profile => {
            if (profile) {
                //update
                Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                ).then(profile => {
                    res.json(profile)
                })
            } else {
                //create
                //check if handle exist
                Profile.findOne({ handle: profileFields.handle })
                    .then(profile => {
                        if (profile) {
                            errors.handle = 'that handle already exists';
                            res.status(400).json(errors);
                        }
                        //save profile
                        new Profile(profileFields).save().then(profile => {
                            res.json(profile);
                        })
                    })
            }
        })
});

module.exports = router;