export default (req, res) => {
  const { mentorId } = req.query
  const events = [
    { mentor_id: 1, title: 'Meeting', start: new Date() },
    { mentor_id: 2, title: 'Lunch', start: new Date() },
    { mentor_id: 1, title: 'nice event', start: new Date() },
    { mentor_id: 2, title: 'nice event', start: new Date() },
    { mentor_id: 1, title: 'nice event', start: new Date() },
    { mentor_id: 1, title: 'nice event', start: new Date() },
  ]
  const eventsByMentor = events.filter((event) => event.mentor_id == mentorId)
  res.status(200).json(eventsByMentor)
}
