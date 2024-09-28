const request = require('supertest');
// import app from '../app'; // Adjust the import based on your app structure
const userModel = require('./../models/userModel.js');

// Mock the user model
jest.mock('./../models/userModel.js');

describe('Cart API', () => {
    const mockUserId = 'userId123';
    const mockItemId = 'itemId123';
    const mockUser = {
        _id: mockUserId,
        cartData: {}
    };

    beforeEach(() => {
        // Reset the mock before each test
        userModel.findById.mockReset();
        userModel.findByIdAndUpdate.mockReset();
    });

    test('Add item to cart', async () => {
        userModel.findById.mockResolvedValue(mockUser);

        const response = await request(app)
            .post('/cart/add') // Adjust the endpoint based on your route setup
            .send({ userId: mockUserId, itemId: mockItemId });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(mockUser.cartData[mockItemId]).toBe(1); // Expect item to be added with quantity 1
        expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(mockUserId, { cartData: { [mockItemId]: 1 } }, { new: true });
    });

    test('Remove item from cart', async () => {
        mockUser.cartData[mockItemId] = 2; // Mocking the user having 2 items in the cart
        userModel.findById.mockResolvedValue(mockUser);

        const response = await request(app)
            .post('/cart/remove') // Adjust the endpoint based on your route setup
            .send({ userId: mockUserId, itemId: mockItemId });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(mockUser.cartData[mockItemId]).toBe(1); // Expect quantity to decrease to 1
        expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(mockUserId, { cartData: { [mockItemId]: 1 } }, { new: true });
    });

    test('Fetch user cart data', async () => {
        userModel.findById.mockResolvedValue(mockUser);

        const response = await request(app)
            .post('/cart/get') // Adjust the endpoint based on your route setup
            .send({ userId: mockUserId });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.cartData).toEqual(mockUser.cartData); // Expect to receive the cartData
    });

    test('Error when user not found', async () => {
        userModel.findById.mockResolvedValue(null);

        const response = await request(app)
            .post('/cart/add') // Adjust the endpoint based on your route setup
            .send({ userId: mockUserId, itemId: mockItemId });

        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('User not found');
    });

    test('Handle invalid input', async () => {
        const response = await request(app)
            .post('/cart/add') // Adjust the endpoint based on your route setup
            .send({ userId: '', itemId: '' }); // Sending empty input

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Invalid input');
    });
});
