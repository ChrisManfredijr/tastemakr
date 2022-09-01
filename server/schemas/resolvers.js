const { User, Taste } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            console.log(context);
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('tastes')
                return userData;
            }else{
                throw new AuthenticationError('Not logged in');
            }
           
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne( { email });
            if (!user) {
                throw new AuthenticationError('Incorrect Username!')
            }
            const correctPw = await user.isCorrectPassword(password);
           
            if(!correctPw) {
                throw new AuthenticationError('Incorrect Password')
            }
            const token = signToken(user);
            return { token, user };
        },
        saveTaste: async (parent, { input }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: {tastes: input} },
                    { new: true }
                ).populate('tastes')
                return updatedUser;
            }else { 
                 //throw new AuthenticationError('You need to be logged in!!!')
            }
           
        },
        removeTaste: async (parent, { artistId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    { $pull: { tastes: {artistId } } },
                    { new: true }
                )
                return updatedUser;
            }
        }
    }
  };
  
  module.exports = resolvers;