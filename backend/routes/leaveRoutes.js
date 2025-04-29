// backend/routes/leaveRoutes.js
import express from "express";
import LeaveRequest from "../models/LeaveRequest.js";

const router = express.Router();

// POST - Submit leave request
router.post("/request", async (req, res) => {
  const { name, email, phone, leaveType, startDate, endDate, reason } = req.body;

  if (!name || !email || !phone || !leaveType || !startDate || !endDate || !reason) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const leaveRequest = new LeaveRequest({
      name,
      email,
      phone,
      leaveType,
      startDate,
      endDate,
      reason,
      status: "Pending",
      date: new Date(),
    });

    await leaveRequest.save();
    res.status(201).json({ message: "Leave request submitted successfully" });
  } catch (error) {
    console.error("Error creating leave request:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET - Get all leave requests
router.get("/requests", async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find();
    res.status(200).json(leaveRequests);
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT - Update leave request status
router.put("/request/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await LeaveRequest.findByIdAndUpdate(id, { status });
    res.status(200).json({ message: "Leave request status updated" });
  } catch (error) {
    console.error("Error updating leave request:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// Update leave status (approve / reject)
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const leave = await LeaveRequest.findById(id);
      if (!leave) {
        return res.status(404).json({ message: "Leave request not found" });
      }
  
      leave.status = status;
      await leave.save();
  
      res.status(200).json({ message: "Leave status updated successfully" });
    } catch (error) {
      console.error("Error updating leave status:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });

export default router;
