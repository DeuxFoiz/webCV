import dbConnect from '../../libs/dbConnect'
import Icon from '../../libs/models/Icon'
import Project from '../../libs/models/Project'
export default async function icons_handler (req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const icons = await Icon.find({})
        const projects = await Project.find({})
        const response = projects.map(project => {
            return {
                _id: project._id,
                name:project.name,
                date:project.date,
                description:project.description,
                image:project.image,
                link:project.link,
                icons: project.icons.map(icon => {
                    return icons.find(icon_ => icon_.name === icon)
                }
                )
            }
        })
        res.status(200).json({ success: true, data: response })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const user = await Project.create(req.body)
        res.status(201).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT':
      try {
        const user = await Project.findByIdAndUpdate(req.body._id, req.body)
        res.status(200).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'DELETE':
      try {
        const user = await Project.findByIdAndDelete(req.params._id)
        res.status(200).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
