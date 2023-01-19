import express from 'express'
import {CreateSuperAdmin} from '../controllers/adminController'

const router = express.Router()

router.post('/create-superadmin', CreateSuperAdmin)

export default router;