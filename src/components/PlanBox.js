//react
import React, { useRef } from 'react';

//styles
import '../assets/css/plan.min.css';

export default function PlanBox({ plan, onPlanSelect }) {

    const planRef = useRef([]);

    let planData = [];

    planData.type = plan;
    planData.popular = false;

    switch (plan)
    {
        case 'easy':
            planData.icon = require('../assets/img/icon/icon-plan-easy.svg').default;
            planData.title = 'Beginner';
            planData.subtitle = 'Just starting to do some Sudoku?';
            planData.perks = [
                {
                    id: 1,
                    title: '1 Easy difficulty Sudoku / week',
                    active: true
                },
                {
                    id: 2,
                    title: 'Access to Community channels',
                    active: false
                },
                {
                    id: 3,
                    title: 'Can be part of Sudoku contests',
                    active: false
                }
            ];
            planData.link = '#';
            return <BoxLayout data={planData} />
        case 'medium':
            planData.icon = require('../assets/img/icon/icon-plan-medium.svg').default;
            planData.title = 'Advanced';
            planData.subtitle = 'You already solved some of them?';
            planData.link = '#';
            planData.perks = [
                {
                    id: 1,
                    title: '2 Medium difficulty Sudoku / week',
                    active: true
                },
                {
                    id: 2,
                    title: 'Access to Community channels',
                    active: true
                },
                {
                    id: 3,
                    title: 'Can be part of Sudoku contests',
                    active: false
                }
            ];
            planData.popular = true;
            return <BoxLayout data={planData} />
        case 'hard':
            planData.icon = require('../assets/img/icon/icon-plan-hard.svg').default;
            planData.title = 'Professional';
            planData.subtitle = "You're a real master, aren't you?";
            planData.link = '#';
            planData.perks = [
                {
                    id: 1,
                    title: '3 Hard difficulty Sudoku / week',
                    active: true
                },
                {
                    id: 2,
                    title: 'Access to Community channels',
                    active: true
                },
                {
                    id: 3,
                    title: 'Can be part of Sudoku contests',
                    active: true
                }
            ];
            return <BoxLayout data={planData} />
        default:
            return null;
    }

    function BoxLayout({data})
    {
        let plan = {data}.data;
        let icon = plan.icon;
        let title = plan.title;
        let subtitle = plan.subtitle;
        let type = plan.type;
        let perks = plan.perks;
        let classContainer = "plan-box " + plan.type + (plan.popular?' popular':'');
        let classBtn = "btn no-min-width  width-100" + (plan.popular?' btn-primary':' btn-secondary');
        let classIcon = "plan-box-icon " + plan.type;

        return (
            <>
                <div className={classContainer}>
                    <div className={classIcon}>
                        <img src={icon} />
                    </div>
                    <div className="popular-label">
                        <span>Popular</span>
                    </div>
                    <span className="label">Difficulty</span>
                    <h3>{title}</h3>
                    <p>{subtitle}</p>
                    <ul>
                    {
                        perks.map((perk, index) => {
                            //let iconPerk = (perk.active?require('../assets/img/icon/icon-perk.svg').default:require('../assets/img/icon/icon-perk-disabled.svg').default);
                            let iconPerk = require('../assets/img/icon/icon-perk.svg').default;
                            return (
                                <li key={index} className={!perk.active?'inactive':''}>
                                    <img src={iconPerk} />
                                    <span>{perk.title}</span>
                                </li>
                            );
                        })
                    }
                    </ul>
                    <button id={title} ref={planRef} className={classBtn} onClick={handleSelect}>Select</button>
                    <p className="no-payment">No credit card required!</p>
                </div>
            </>
        );
        
    }

    function handleSelect(e)
    {
        let type = planRef.current.id;
        onPlanSelect(type);
    }

    return (
        <></>
    );
}
