import dbConnect from '../../libs/dbConnect'
import Icon from '../../libs/models/Icon'

export default async function icons_handler (req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const icons = await Icon.find({})
        res.status(200).json({ success: true, data: icons })
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
    case 'PUT':
      try {
        const user = await Icon.findByIdAndUpdate(req.body._id, req.body)
        res.status(200).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'DELETE':
      try {
        const icon = await Icon.findOneAndDelete({ _id: req.body })
        res.status(200).json({ success: true, data: icon })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
