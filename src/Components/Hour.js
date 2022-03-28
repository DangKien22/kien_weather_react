import { useSelector } from 'react-redux';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

export default function Hour() {
    const data = useSelector(state => state.weathers.data);
    const labels = (data && data.hourly).map(hours => {
        return moment.unix(hours.dt).format('h:mm a')
    })
    const temp = (data && data.hourly).map(hours => { return hours.temp });
    const Feelslike = (data && data.hourly).map(hours => { return hours.feels_like });
    return (
        <div className="bg-white p-2 mt-2 rounded-3">
            <Line
                data={{
                    labels,
                    datasets:
                        [
                            {
                                data: temp,
                                label: " Temp (°C)",
                                borderColor: "#8e5ea2",
                                fill: true
                            },
                            {
                                data: Feelslike,
                                label: " Feel like (°C)",
                                borderColor: "#3cba9f",
                                fill: true
                            }
                        ]

                }}
                options={{
                    legend: {
                        display: true,
                        position: "top"
                    }
                }}
            />
        </div>
    )
}