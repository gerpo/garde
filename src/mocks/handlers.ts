import { rest } from 'msw'

const BASE_URL = 'http://localhost:8000';

export default [
    rest.get(`${BASE_URL}/message`, (req, res, ctx) => {
        return res(
            ctx.json({
                message: 'it works :)'
            })
        )
    }),

    /* rest.get(`${BASE_URL}/api/user`, (req, res, ctx) => {
        return res(
            ctx.json({
                "id": 1,
                "name": "Laron Hegmann",
                "email": "1ewald75@example.com",
                "email_verified_at": "2021-10-15T13:30:25.000000Z",
                "two_factor_secret": null,
                "two_factor_recovery_codes": null,
                "created_at": "2021-10-15T13:30:25.000000Z",
                "updated_at": "2021-10-15T13:30:25.000000Z"
            })
        )
    }) */
]