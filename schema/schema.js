const graphql = require('graphql')
const {
    GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema
} = graphql

const _ = require('lodash')

const users = [{ id: 1, firstName: "xz1", age: 22 }, { id: 2, firstName: "xz2", age: 33 }]


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLInt },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt }
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLInt } },
            resolve(parentValue, args) {
                return _.find(users, { id: args.id })
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})