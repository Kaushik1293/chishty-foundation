import liveImpact from '@/src/assets/images/homepage/aboutsection/live-impact.svg';
import mealsDistributed from '@/src/assets/images/homepage/aboutsection/meals-distributed.svg';
import studentsSupported from '@/src/assets/images/homepage/aboutsection/students-supported.svg';
import medicalCamps from '@/src/assets/images/homepage/aboutsection/medical-camps.svg';

export interface ImpactStat {
  icon: any;
  label: string;
  // HOLD FOR VERIFIED FIGURES: The Foundation is compiling audited totals from 2007 to date.
  // Values remain null/hidden until confirmed.
  value: number | null;
  suffix?: string;
  decimals?: number;
}

export const impactStats: ImpactStat[] = [
  {
    icon: liveImpact,
    label: "Lives Impacted",
    value: null,
    suffix: "",
  },
  {
    icon: mealsDistributed,
    label: "Meals Distributed",
    value: null,
    suffix: "",
    decimals: 1,
  },
  {
    icon: studentsSupported,
    label: "Students Supported",
    value: null,
    suffix: "",
  },
  {
    icon: medicalCamps,
    label: "Medical Camps",
    value: null,
    suffix: "",
  },
];
