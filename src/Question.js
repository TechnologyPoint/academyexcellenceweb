import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const questionList = [
  {
    id: 'Q1',
    question:'Please  find the correct answer 10 + 2 = ? ',
    options: [
      {
        id: '1',
        option: '12',
        correct: 'Y',
      },
      {
        id: '2',
        option: '20',
        correct: 'N',
      },
    ],
  },
  {
    id: 'Q2',
    question:'Please  find the correct answer 10 + 5 = ? ',
    options: [
      {
        id: '1',
        option: '10',
        correct: 'N',
      },
      {
        id: '2',
        option: '15',
        correct: 'Y',
      }
    ],
  },
  {
    id: 'Q3',
    question:'Please  find the correct answer 25 + 5 = ? ',
    options: [
      {
        id: '1',
        option: '30',
        correct: 'Y',
      },
      {
        id: '2',
        option: '15',
        correct: 'N',
      }
    ],
  }
];


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  root: {
    width: '100%',
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function Question(props) {
  const [progress, setProgress] = React.useState(0);
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Choose wisely');
  const [helperTextone, setHelperTextone] = React.useState(' ');
  const [helperTextcorrect, setHelperTextcorrect] = React.useState(' ');
  const [helperTextwrong, setHelperTextwrong] = React.useState(' ');
  //const [state, setState] = React.useState(true);
  const [showText, setShowText] = React.useState(true);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [correctAns, setCorrectAns] = React.useState(0);
  const [wrongAns, setWrongAns] = React.useState(0);
  const [selected, setSelected] = React.useState();
  const [questionAnswer,setQuestionAnswer] = React.useState(['']);
  const [questionDetails, setQuestionDetails] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);


  React.useEffect(() => {
    fetch("https://pznmdvakt6.execute-api.ap-south-1.amazonaws.com/dev/getQuestionSet?questionSet=" + props.questionSet)
      .then(res => res.json())
      .then(
        (result) => {
  setQuestionDetails(result.questionList);
          setIsLoaded(true);


          },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(false);
          alert(error);
          alert("https://pznmdvakt6.execute-api.ap-south-1.amazonaws.com/dev/getQuestionSet?questionSet=" + props.questionSet);
          //setError(error);
        }
      )
  }, [])


  const prevNextQuestion = (event, newValue) => {
      if (newValue === 'next') {
        if (questionIndex + 1 < questionDetails.length){
          setQuestionIndex(questionIndex + 1);
          setHelperText(' '); /** reset the value of setHelperText for next icon arrow*/
          setError(false);
        }

      }



      if (newValue === 'previous') {
        if (questionIndex > 0){
          setQuestionIndex(questionIndex - 1);
        }
        if (value === 'Y'){
          if (correctAns > 0){
            setCorrectAns(correctAns - 1);
          }
        }
        if (value === 'N'){
          if (wrongAns > 0){
            setWrongAns(wrongAns - 1);
          }
        }

      }
      if (questionAnswer.length === questionIndex) {
        questionAnswer[questionIndex] = '';
      }

    };

  const selectAnswer = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
    questionAnswer[questionIndex] = event.target.value;
    setQuestionAnswer(questionAnswer)
    var answered = 0;
    for (var i = 0; i<questionAnswer.length ; i++){
      if (questionAnswer[i] !== ''){
        answered = answered + 1;
      }
    }
    setProgress((answered/questionDetails.length)*100);

  };

  const checkAnswer = (event) => {
    event.preventDefault();
    if (value === 'Y') {
      if (correctAns + 1 <= questionList.length){
            setCorrectAns(correctAns + 1);
          }
      setHelperText('Correct!');
      setError(false);
    } else if (value === 'N') {
      if (wrongAns + 1 <= questionList.length){
           setWrongAns(wrongAns + 1);
         }
      setHelperText('Sorry, wrong answer!');
      setError(true);
    } else {
      setHelperText('Please select an option.');
      setError(true);
    }
  };

<<<<<<< HEAD
 if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
=======
  const checkAnsweras = (event) => {
    event.preventDefault();
    setHelperTextone('Total Questions Attemt:');
    setHelperTextcorrect('Correct Answer:');
    setHelperTextwrong('Wrong Answer:');
    setShowText(false);
  };

>>>>>>> d21b5e0e435462ccf32d8ac26a7abb5ff07cc369
  return (
    <div className={classes.root}>
    {showText && <LinearProgressWithLabel value={progress} />}

    {showText && <form onSubmit={checkAnswer}>
      <FormControl component="fieldset" error={error} className={classes.formControl}>
        <FormLabel component="legend">{questionDetails[questionIndex].question}</FormLabel>
        <RadioGroup aria-label="quiz" name="quiz" value={questionAnswer[questionIndex]} onChange={selectAnswer}>
          <FormControlLabel value={questionDetails[questionIndex].options[0].correct} control={<Radio />} label={questionDetails[questionIndex].options[0].option} />
          <FormControlLabel value={questionDetails[questionIndex].options[1].correct} control={<Radio />} label={questionDetails[questionIndex].options[1].option} />
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
        <Button type="submit" variant="outlined" color="primary" className={classes.button}>
          Check Answer
        </Button>
      </FormControl>
    </form>}
    <form onSubmit={checkAnsweras}>
    <FormControl component="fieldset" className={classes.formControl}>
    <FormHelperText>{helperTextone}{progress}</FormHelperText>
    <FormHelperText>{helperTextcorrect}{correctAns}</FormHelperText>
    <FormHelperText>{helperTextwrong}{wrongAns}</FormHelperText>
    <Button type="submit" variant="outlined" color="primary" className={classes.button}>
      Complete Test
    </Button>
    </FormControl>
    </form>
      {showText && <BottomNavigation value={value} onChange={prevNextQuestion} className={classes.root}>
        <BottomNavigationAction label="Previous" value="previous" icon={<ArrowBackIosIcon />}/>
        <BottomNavigationAction label="Next" value="next" icon={<ArrowForwardIosIcon />} />
<<<<<<< HEAD
      </BottomNavigation>
=======
      </BottomNavigation>}

>>>>>>> d21b5e0e435462ccf32d8ac26a7abb5ff07cc369
    </div>
  );
}
}
