import axiosInstance from "./axios.config";

export const createEvent = async (
  eventName: string,
  description: string,
  timeIn: any,
  timeOut: any
) => {
  try {
    const res = await axiosInstance.post("/create-event", {
      eventName,
      description,
      timeIn,
      timeOut,
    });
    return {
      message: res.data.message,
      status: res.status,
    };
  } catch (error) {
    return null;
  }
};

export const getEvents = async () => {
  try {
    const res = await axiosInstance.get("/get-events");
    return res.data.data;
  } catch (error) {
    return [];
  }
};

export const getStudentEvents = async (studentId: string) => {
};

export const getTimeInStatus = async (eventId: string, email: string) => {
  try {
    const res = await axiosInstance.get("/get-time-in-status", {
      params: {
        eventId,
        email,
      },
    });

    return res.data.message;

    // return res.data.data;
  } catch (error) {
    return null;
  }
};

export const getTimeOutStatus = async (eventId: string, email: string) => {
  try {
    const res = await axiosInstance.get("/get-time-in-status", {
      params: {
        eventId,
        email,
      },
    });

    return res.data.message;

    // return res.data.data;
  } catch (error) {
    return null;
  }
};

export const getAttendance = async (eventId: string) => {
  try {
    const res = await axiosInstance.get("/get-attendance", {
      params: {
        eventId,
      },
    });

    return res.data.attendance;
  } catch (error) {
    return null;
  }
};


export const deleteEventById = async (id: string) => {
  try {
    const res = await axiosInstance.delete("/delete-event", {
      params: {
        eventId: id
      }
    })
        return res;
  } catch (error) {
    return null;
  }
}