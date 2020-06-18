const graphql = require('graphql')
const {
    GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList
} = graphql

const _ = require('lodash')

const users = [
    { id: 1, firstName: "user1", age: 22, companyId: 1 }, 
    { id: 2, firstName: "user2", age: 33, companyId: 2 }, 
    { id: 3, firstName: "user3", age: 44, companyId: 2 }]

const companies = [{ id: 1, name: "c1", sector: "s1" }, { id: 2, name: "c2", sector: "s2" }]


const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () =>  ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        sector: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return _.filter(users, { companyId: parentValue.id })
            }
        }
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLInt },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: { 
            type: CompanyType,
            resolve(parentValue, args) {
                return _.find(companies, { id: parentValue.companyId })
            }
        }
    })
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
        },
        company: { 
            type: CompanyType,
            args: { id: { type: GraphQLInt } },
            resolve(parentValue, args) {
                return _.find(companies, { id: args.id })
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})