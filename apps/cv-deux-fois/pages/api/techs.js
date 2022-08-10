import dbConnect from '../../libs/dbConnect'
import Icon from '../../libs/models/Icon'
import Tech from '../../libs/models/Tech'
export default async function icons_handler (req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const data = await Tech.find({})
        res.status(200).json({ success: true, data: data })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT':
      try {
        const data = await Tech.findByIdAndUpdate(req.body._id, req.body)
        res.status(200).json({ success: true, data: data })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const user = await Icon.create(req.body)
        res.status(201).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
