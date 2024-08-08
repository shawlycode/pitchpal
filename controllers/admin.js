

// Review a pitch (approve/reject)
export const reviewPitch = async (req, res, next) => {
  const { pitchId } = req.params;
  const { reviewStatus } = req.body;

  try {
    const pitch = await PitchModel.findById(pitchId);
    if (!pitch) {
      return res.status(404).json({ message: 'Pitch not found' });
    }
  } catch (error) {
    next(error)
  }
};



