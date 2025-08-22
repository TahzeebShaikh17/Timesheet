/* eslint-disable */

'use client';

import { Button, TextInput, CustomSelect, Label } from '@/components/form';
import MainLayout from '@/components/layout/portal/MainLayout';

import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaClock,
  FaCalendarAlt,
  FaList,
  FaChartBar,
  FaCog,
  FaSave,
  FaChevronLeft,
  FaChevronRight,
  FaBriefcase,
  FaStickyNote,
  FaPlus,
} from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import "./TimesheetPortal.css"; // move your CSS here

interface TimeEntry {
  startTime: string;
  endTime: string;
  breakDuration: string;
  project: string;
  tasks: string;
  notes: string;
}

type Entries = Record<string, TimeEntry>;

const TimesheetPortal: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());
  const [timeEntries, setTimeEntries] = useState<Entries>({});
  const [showList, setShowList] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // get Monday of the week
  const getMondayOfWeek = (date: Date): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const getWeekdays = (): Date[] => {
    const monday = getMondayOfWeek(currentWeek);
    return Array.from({ length: 5 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });

  const getDateKey = (date: Date): string => date.toISOString().split("T")[0];

  const calculateHours = (startTime?: string, endTime?: string, breakDuration?: string): number => {
    if (!startTime || !endTime) return 0;
    const start = new Date(`2024-01-01T${startTime}`);
    const end = new Date(`2024-01-01T${endTime}`);
    const breakMinutes = parseInt(breakDuration || "0", 10) || 0;
    const diffMs = end.getTime() - start.getTime();
    const diffMinutes = diffMs / (1000 * 60) - breakMinutes;
    return Math.max(0, diffMinutes / 60);
  };

  const handleInputChange = (dateKey: string, field: keyof TimeEntry, value: string) => {
    setTimeEntries((prev) => ({
      ...prev,
      [dateKey]: { ...prev[dateKey], [field]: value },
    }));
  };

  const getEntry = (dateKey: string): TimeEntry =>
    timeEntries[dateKey] || {
      startTime: "",
      endTime: "",
      breakDuration: "",
      project: "",
      tasks: "",
      notes: "",
    };

  const navigateWeek = (direction: number) => {
    setCurrentWeek((prev) => {
      const newWeek = new Date(prev);
      newWeek.setDate(prev.getDate() + direction * 7);
      return newWeek;
    });
  };

  const getWeeklyTotal = (): number => {
    return getWeekdays().reduce((sum, d) => {
      const e = getEntry(getDateKey(d));
      return sum + calculateHours(e.startTime, e.endTime, e.breakDuration);
    }, 0);
  };

  const saveTimesheet = () => {
    alert("Timesheet saved successfully!");
    console.log("Timesheet Data:", timeEntries);
  };

  return (
    <MainLayout>

    <div className="d-flex">

      {/* Main Content */}
      <div className="Main-content flex-grow-1">
        {/* <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
          <div className="container-fluid">
            <button
              className="navbar-toggler sidebar-toggle me-3"
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
             <FaBars />
            </button>
            <span className="navbar-brand mb-0 h1">Timesheet Portal</span>
            <div className="ms-auto">
              <span className="badge bg-primary">Welcome, User</span>
            </div>
          </div>
        </nav> */}

        <div className="container-fluid timesheet-section">
          {/* Add Timesheet Section */}
          {!showList && (
            <>
              <div className="card timesheet-card mb-4">
                <div className="card-body">
                  <div className="card-head">
                    <div className="head">
                      <FaCalendarAlt  className="cal-icon"/>
                      <h3 className="mb-0">Weekly Timesheet</h3>
                    </div>
                    <button className="btn btn-primary button" onClick={saveTimesheet}>
                     <FaSave/> 
                     Save Timesheet
                    </button>
                  </div>

                  {/* Week Navigation */}
                  <div className="nav-week">
                    <button className="btn btn-outline-secondary me-3" onClick={() => navigateWeek(-1)}>
                      <FaChevronLeft />
                    </button>
                    <h5 className="week-date">
                      Week of {getWeekdays()[0].toLocaleDateString()} - {getWeekdays()[4].toLocaleDateString()}
                    </h5>
                    <button className="btn btn-outline-secondary ms-3" onClick={() => navigateWeek(1)}>
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              </div>

              {/* Daily Forms */}
              {getWeekdays().map((date) => {
                const dateKey = getDateKey(date);
                const entry = getEntry(dateKey);
                const totalHours = calculateHours(entry.startTime, entry.endTime, entry.breakDuration);
                return (

                  <div className="card timesheet-card mb-3" key={dateKey}>
                    <div className="day-header">
                      <h5 className="mb-0">{formatDate(date)}</h5>
                      <div className="hours-badge">
                        <FaClock /> 
                        {totalHours.toFixed(1)} hours
                      </div>
                    </div>
                    <div className="card-body ">
                      <div className="row g-4 card-row">
                        {/* Time Inputs */}
                        <div className="col-lg-4">
                          <h6 className="clock-h3">
                            <FaClock className="clock"/> 
                            Time
                          </h6>
                          <div className="row g-2 mb-3 card-row">
                            <div className="col-6">
                              <label className="form-label small text-muted">Start Time</label>
                              <input
                                type="time"
                                className="form-control"
                                value={entry.startTime}
                                onChange={(e) => handleInputChange(dateKey, "startTime", e.target.value)}
                              />
                            </div>
                            <div className="col-6">
                              <label className="form-label small text-muted">End Time</label>
                              <input
                                type="time"
                                className="form-control"
                                value={entry.endTime}
                                onChange={(e) => handleInputChange(dateKey, "endTime", e.target.value)}
                              />
                            </div>
                          </div>
                          {/* <label className="form-label small text-muted">Break Duration (minutes)</label>
                          <input
                            type="number"
                            className="form-control"
                            value={entry.breakDuration}
                            onChange={(e) => handleInputChange(dateKey, "breakDuration", e.target.value)}
                          /> */}
                        </div>

                        {/* Work Details */}
                        <div className="col-lg-4">
                          <h6 className="clock-h3">
                            <FaBriefcase className="clock" />
                             Work Details
                          </h6>
                          <div className="card-row">
                          <label className="form-label small text-muted">Project</label>
                            <select
                            className="custom-dropdown"
                            value={entry.project}
                            onChange={(e) => handleInputChange(dateKey, "project", e.target.value)}
  >
    <option value="">-- Select Project --</option>
    <option value="Project A">Project A</option>
    <option value="Project B">Project B</option>
    <option value="Project C">Project C</option>
  </select>
</div>

                          {/* <div className="card-row">
                            <label className="form-label small text-muted">Project</label>
                            <input
                              type="text"
                              className="form-control"
                              value={entry.project}
                              onChange={(e) => handleInputChange(dateKey, "project", e.target.value)}
                            />
                          </div> */}
                          {/* <label className="form-label small text-muted">Tasks Completed</label>
                          <textarea
                            className="form-control"
                            rows={3}
                            value={entry.tasks}
                            onChange={(e) => handleInputChange(dateKey, "tasks", e.target.value)}
                          /> */}
                        </div>

                        {/* Notes */}
                        <div className="col-lg-4">
                          <h6 className="clock-h3">
                            <FaStickyNote className="clock" /> 
                            Notes
                          </h6>
                          <div className="card-row">
                            <label className="form-label small text-muted">Description</label>
                          
                          <textarea
                            className="form-control"
                            rows={6}
                            value={entry.notes}
                            onChange={(e) => handleInputChange(dateKey, "notes", e.target.value)}
                          />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                );
              })}

              {/* Weekly Summary */}
              <div className="card timesheet-card">
                <div className="card-body">
                  <h4 className="card-title mb-4">
                    <FaChartBar  /> 
                    Weekly Summary
                  </h4>
                  <div className="row g-3 summary-row">
                    {getWeekdays().map((date) => {
                      const dateKey = getDateKey(date);
                      const entry = getEntry(dateKey);
                      const totalHours = calculateHours(entry.startTime, entry.endTime, entry.breakDuration);
                      return (
                        <div className="col-md-2" key={dateKey}>
                          <div className="summary-card p-3 text-center">
                            <div className="fw-bold">{date.toLocaleDateString("en-US", { weekday: "short" })}</div>
                            <div className="small opacity-75">{date.getDate()}</div>
                            <div className="h5 mb-0 mt-1">{totalHours.toFixed(1)}h</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="weekly-total p-3 mt-4 text-center">
                    <span className="h5 mb-0">Total Weekly Hours: </span>
                    <span className="h3 ms-2">{getWeeklyTotal().toFixed(1)}h</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* List Timesheet Section */}
          {showList && (
            <div className="card timesheet-card">
              <div className="card-body">
                <h3 className="card-title">
                  <FaList  />
                   Timesheet History
                </h3>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>Week</th>
                        <th>Total Hours</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Jan 15 - Jan 19, 2024</td>
                        <td>40.0h</td>
                        <td>
                          <span className="badge bg-success">Approved</span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-1">
                            <i className="fas fa-eye" />
                          </button>
                          <button className="btn btn-sm btn-outline-secondary">
                            <i className="fas fa-download" />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Jan 8 - Jan 12, 2024</td>
                        <td>38.5h</td>
                        <td>
                          <span className="badge bg-warning">Pending</span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-1">
                            <i className="fas fa-eye" />
                          </button>
                          <button className="btn btn-sm btn-outline-secondary">
                            <i className="fas fa-download" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </MainLayout>

  );
};

export default TimesheetPortal;
