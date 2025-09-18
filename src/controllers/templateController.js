import Template from "../models/template.js";

/* GET Templates */
// As a convention we keep '_' for unused parameters
export async function getAllTemplates(_, res) {
  try {
    const temp = await Template.find().sort({ createdAt: -1 }); // show newest Note first;
    res.status(200).json(temp);
  } catch (error) {
    console.error("Error in getAllTemplates control ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// GET by id
export async function getTemplateById(req, res) {
  try {
    const temp = await Template.findById(req.params.id);
    if (!temp) return res.status(404).json({ message: "Note not found!" });
    res.json(temp);
  } catch (error) {
    console.error("Error in getNoteById controller ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/* Create Template */
export async function createTemplate(req, res) {
  console.log(req.body);
  try {
    // Destructuring template details from the body of POST request
    const { title, content, price } = req.body;

    // creating new template using Template Schema
    const temp = new Template({ title, content, price });

    // optional- used to save template
    const savedTemplate = await temp.save();

    // send success message with the saved template
    res.status(201).json(savedTemplate);
  } catch (error) {
    console.error("Error in createTemplate controller ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/* Update Template */
export async function updateTemplate(req, res) {
  try {
    const { title, content, price } = req.body;
    console.log("UPDATE -> INCOMING BODY: ", req.body);
    const updatedTemplate = await Template.findByIdAndUpdate(
      // since client will be sending the is via params in the URL
      req.params.id,
      // data to update
      { title, content, price },
      // to return the updated data
      {
        new: true,
      }
    );

    // if note not found
    if (!updatedTemplate)
      return res.status(404).json({ message: "Template not found" });

    // send success message
    res.status(200).json(updatedTemplate);
  } catch (error) {
    console.error("Error in updateTemplate controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteTemplate(req, res) {
  try {
    const deleted_temp = await Template.findByIdAndDelete(req.params.id);

    if (!deleted_temp)
      return res.status(404).json({ message: "Template not found" });

    res.status(200).json({
      Message: "Template deleted successfully",
      Deleted_template: deleted_temp,
    });
  } catch (error) {
    console.error("Error in deleteTemplate controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
