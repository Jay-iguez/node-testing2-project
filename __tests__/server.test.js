const request = require('supertest')
const server = require('../api/server')
const db = require('../data/db-config')
const Dogs_model = require('../api/dogs/dogs_model')

test('Sanity check', () => {
    expect(2).not.toBe(5)
    expect(process.env.NODE_ENV).toBe('testing') // eslint-disable-line
})


describe('Server testing', () => {
    beforeAll(async () => {
        await db.migrate.rollback()
        await db.migrate.latest()
    })
    beforeEach(async () => {
        await db.seed.run()
    })
    describe('Routes within dogs_routes at /api', () => {
        let dog_data
        beforeEach(() => {
            dog_data = {dog_name: 'Fido', dog_breed: 'Labrador', dog_lbs: 80, dog_sheds: true, office_id: 1}
        })
        test('[GET] /api/ without proper query returns error', async () => {
            let expected = 'Database not provided!'
            let input = '/api/'
            let res = await request(server).get(input)
            expect(res.body.message).toBe(expected)
            input = '/api/?database=dogs'
            expected = 7
            res = await request(server).get(input)
            expect(res.body).toHaveLength(expected)
        })
        test('[GET] /api/?database=offices returns proper data', async () => {
            let expected = 3
            let input = '/api/?database=offices'
            let res = await request(server).get(input)
            expect(res.body).toHaveLength(expected)
        })
        test('[POST] /api/dogs?database=offices returns an error of mismatch query', async () => {
            let expected = 'Provided query must match endpoint!'
            let input_url = '/api/dogs?database=offices'
            let input_body = dog_data
            let res = await request(server).post(input_url).send(input_body)
            expect(res.body.message).toBe(expected)
        })
        test('[POST] /api/dogs?database=dogs returns new dog', async () => {
            let expected = dog_data
            let input_body = {...dog_data}
            let input_url = '/api/dogs?database=dogs'
            let res = await request(server).post(input_url).send(input_body)
            expect(res.body).toMatchObject({...expected, dog_sheds: 1})
        })
        test('[PUT] /api/dogs/:id?database=dogs returns dog updated', async () => {
            let not_expected = {dog_name: 'Ordell', dog_breed: 'German Shepherd', dog_lbs: 110, dog_sheds: true, office_id: 2}
            let expected = {...not_expected, dog_lbs: 150, dog_sheds: 0}
            let input_url = `/api/dogs/${1}?database=dogs`
            let input_body = {...expected, dog_sheds: false}
            console.log(input_body)
            let res = await request(server).put(input_url).send(input_body)
            expect(res.body).not.toMatchObject(not_expected)
            expect(res.body).toMatchObject(expected)
        })
    })
    describe('Model functions', () => {
        let dog_data
        beforeEach(() => {
            dog_data = {dog_name: 'Fido', dog_breed: 'Labrador', dog_lbs: 80, dog_sheds: true, office_id: 1}
        })
        test('get_all returns dogs on input dogs', async () => {
            let expected = await db('dogs')
            let actual = await Dogs_model.get_all('dogs')
            expect(actual).toMatchObject(expected)
        })
        test('get_all returns offices on input offices', async () => {
            let expected = await db('offices')
            let actual = await Dogs_model.get_all('offices')
            expect(actual).toMatchObject(expected)
        })
        test('get_by_id retuns dog of id', async () => {
            let expected = {dog_name: 'Ordell', dog_breed: 'German Shepherd', dog_lbs: 110, dog_sheds: true, office_id: 2}
            let actual = await Dogs_model.get_by_id({id: 1, query: 'dog_id'}, 'dogs')
            expect({...actual, dog_sheds: true}).toMatchObject(expected)
        })
        test('create returns new dog', async () => {
            let expected = {...dog_data, dog_sheds: 1}
            let actual = await Dogs_model.create(dog_data, 'dogs')
            expect(actual).toMatchObject(expected)
        })
        test('update updates dog of id', async () => {
            let not_expected = {dog_name: 'Ordell', dog_breed: 'German Shepherd', dog_lbs: 110, dog_sheds: true, office_id: 2}
            let expected = {...not_expected, dog_lbs: 150}
            let input = {...expected}
            let actual = await Dogs_model.update(input, 1, 'dogs')
            expect(actual).not.toMatchObject(not_expected)
            expect({...actual, dog_sheds: true}).toMatchObject(expected)
        })
    })
})
